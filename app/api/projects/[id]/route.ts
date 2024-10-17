import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { updateProjectFormSchema } from '@/lib/schemas/project/projectFormSchema';
import {
  projectApiResponseSchema,
  projectApiErrorSchema,
  ProjectApiResponse,
  ProjectApiError,
} from '@/lib/schemas/project/projectApiResponseSchema';
import { unlink } from 'fs/promises';
import path from 'path';
import { generateProjectImageFileName } from '@/lib/utils/naming-utils';
import { saveFile } from '@/lib/utils/file-utils';
import { Prisma } from '@prisma/client';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse<ProjectApiResponse | ProjectApiError>> {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      throw new Error('ID invalide');
    }

    const formData = await request.formData();
    const validatedData = updateProjectFormSchema.parse({
      title: formData.get('title'),
      description: formData.get('description'),
      siteUrl: formData.get('siteUrl'),
      repoUrl: formData.get('repoUrl'),
      image: formData.get('image'),
      skillIds: JSON.parse(formData.get('skillIds') as string),
    });

    const { title, description, siteUrl, repoUrl, image, skillIds } = validatedData;

    const existingProject = await prisma.project.findUnique({
      where: { id },
      include: { skills: true },
    });
    if (!existingProject) {
      throw new Error('Projet non trouvé');
    }

    const fileName = generateProjectImageFileName(title);
    const filePath = path.join(process.cwd(), 'public', 'images', 'projects', fileName);

    const updatedProject = await prisma.$transaction(async (tx) => {
      if (image) {
        await saveFile(image, filePath);
      }

      try {
        const project = await tx.project.update({
          where: { id },
          data: {
            title,
            description,
            siteUrl,
            repoUrl,
            imagePath: image ? `/images/projects/${fileName}` : existingProject.imagePath,
            skills: {
              set: skillIds.map((id) => ({ id })),
            },
          },
          include: { skills: true },
        });

        return project;
      } catch (dbError) {
        if (image) {
          await unlink(filePath).catch(() => {
            // TODO: Utiliser un logger
            console.error(
              'Erreur lors de la suppression du nouveau fichier : ',
              filePath,
            );
          });
        }
        throw dbError;
      }
    });

    if (existingProject.imagePath && image) {
      const fullOldPath = path.join(process.cwd(), 'public', existingProject.imagePath);
      await unlink(fullOldPath).catch(() => {
        // TODO: Utiliser un logger
        console.error(
          "Erreur lors de la suppression de l'ancien fichier : ",
          fullOldPath,
        );
      });
    }

    const response = projectApiResponseSchema.parse({
      ...updatedProject,
      message: 'Projet mis à jour avec succès',
    });

    return NextResponse.json(response);
  } catch (error) {
    // TODO: Utiliser un logger
    console.error('Erreur lors de la mise à jour du projet:', error);

    if (error instanceof z.ZodError) {
      const validationError = projectApiErrorSchema.parse({
        message: 'Erreur de validation des données du projet',
      });
      return NextResponse.json(validationError, { status: 400 });
    }

    const serverError = projectApiErrorSchema.parse({
      message:
        error instanceof Error
          ? error.message
          : 'Erreur lors de la mise à jour du projet',
    });
    return NextResponse.json(serverError, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse<ProjectApiResponse | ProjectApiError>> {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      throw new Error('ID invalide');
    }

    const deletedProject = await prisma.$transaction(async (tx) => {
      const project = await tx.project.findUnique({
        where: { id },
        include: { skills: true },
      });
      if (!project) {
        throw new Error('Projet non trouvé');
      }

      const deletedProject = await tx.project.delete({
        where: { id },
        include: { skills: true },
      });

      if (project.imagePath) {
        const filePath = path.join(process.cwd(), 'public', project.imagePath);
        await unlink(filePath).catch(() => {
          // TODO: Utiliser un logger
          console.error('Erreur lors de la suppression du fichier : ', filePath);
        });
      }

      return deletedProject;
    });

    const response = projectApiResponseSchema.parse({
      ...deletedProject,
      message: 'Projet supprimé avec succès',
    });

    return NextResponse.json(response);
  } catch (error) {
    // TODO: Utiliser un logger
    console.error('Erreur lors de la suppression du projet:', error);

    if (error instanceof z.ZodError) {
      const validationError = projectApiErrorSchema.parse({
        message: 'Erreur de validation des données du projet',
      });
      return NextResponse.json(validationError, { status: 400 });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const dbError = projectApiErrorSchema.parse({
        message: 'Erreur lors de la suppression du projet',
      });
      return NextResponse.json(dbError, { status: 500 });
    }

    const serverError = projectApiErrorSchema.parse({
      message:
        error instanceof Error
          ? error.message
          : 'Erreur lors de la suppression du projet',
    });
    return NextResponse.json(serverError, { status: 500 });
  }
}
