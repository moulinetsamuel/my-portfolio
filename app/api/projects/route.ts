import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { Project, projectSchema } from '@/lib/schemas/project/projectSchema';
import {
  ProjectApiError,
  projectApiErrorSchema,
  ProjectApiResponse,
  projectApiResponseSchema,
} from '@/lib/schemas/project/projectApiResponseSchema';
import { projectFormSchema } from '@/lib/schemas/project/projectFormSchema';
import { generateProjectImageFileName } from '@/lib/utils/naming-utils';
import logError from '@/lib/errors/logger';
import { deleteFromR2, uploadToR2 } from '@/lib/utils/r2Client';

export async function GET(): Promise<NextResponse<Project[] | ProjectApiError>> {
  try {
    const projects = await prisma.project.findMany({
      include: { skills: true },
    });

    if (projects.length === 0) {
      const notFoundError = projectApiErrorSchema.parse({
        message: 'Aucun projet trouvé',
      });
      return NextResponse.json(notFoundError, { status: 404 });
    }

    const validatedProjects = z.array(projectSchema).parse(projects);

    return NextResponse.json(validatedProjects);
  } catch (error) {
    logError('Erreur lors de la récupération des projets:', error);

    if (error instanceof z.ZodError) {
      const validationError = projectApiErrorSchema.parse({
        message: 'Erreur de validation des données des projets',
      });
      return NextResponse.json(validationError, { status: 500 });
    }

    const serverError = projectApiErrorSchema.parse({
      message: 'Erreur lors de la récupération des projets',
    });
    return NextResponse.json(serverError, { status: 500 });
  }
}

export async function POST(
  request: Request,
): Promise<NextResponse<ProjectApiResponse | ProjectApiError>> {
  try {
    const formData = await request.formData();

    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      siteUrl: formData.get('siteUrl'),
      repoUrl: formData.get('repoUrl'),
      image: formData.get('image'),
      skillIds: formData.getAll('skillIds').map(Number),
    };

    const validatedData = projectFormSchema.parse(data);

    const { title, description, siteUrl, repoUrl, image, skillIds } = validatedData;

    const fileName = generateProjectImageFileName(title);

    const newProject = await prisma.$transaction(async (tx) => {
      const buffer = await image.arrayBuffer();
      const imagePath = await uploadToR2(fileName, Buffer.from(buffer), image.type);

      try {
        const project = await tx.project.create({
          data: {
            title,
            description,
            imagePath,
            siteUrl,
            repoUrl,
            skills: { connect: skillIds.map((id) => ({ id })) },
          },
          include: { skills: true },
        });

        return project;
      } catch (dbError) {
        await deleteFromR2(fileName).catch((err) => {
          logError('Erreur lors de la suppression du fichier dans R2 : ', err);
        });

        throw dbError;
      }
    });

    const response = projectApiResponseSchema.parse({
      data: newProject,
      message: 'Projet ajouté avec succès',
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    logError("Erreur lors de l'ajout du projet:", error);

    if (error instanceof z.ZodError) {
      const validationError = projectApiErrorSchema.parse({
        message: 'Erreur de validation des données du projet',
      });
      return NextResponse.json(validationError, { status: 400 });
    }

    const serverError = projectApiErrorSchema.parse({
      message: "Erreur lors de l'ajout du projet",
    });
    return NextResponse.json(serverError, { status: 500 });
  }
}
