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
import { generateProjectImageFileName } from '@/lib/utils/naming-utils';
import { Prisma } from '@prisma/client';
import logError from '@/lib/errors/logger';
import { deleteFromR2, uploadToR2 } from '@/lib/utils/r2Client';

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
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      siteUrl: formData.get('siteUrl'),
      repoUrl: formData.get('repoUrl'),
      image: formData.get('image') || undefined,
      skillIds: formData.getAll('skillIds').map(Number),
    };
    const validatedData = updateProjectFormSchema.parse(data);

    const { title, description, siteUrl, repoUrl, image, skillIds } = validatedData;

    const existingProject = await prisma.project.findUnique({
      where: { id },
      include: { skills: true },
    });
    if (!existingProject) {
      throw new Error('Projet non trouvé');
    }

    const updatedProject = await prisma.$transaction(async (tx) => {
      let newImagePath = existingProject.imagePath;

      if (image) {
        const fileName = generateProjectImageFileName(title);
        const buffer = await image.arrayBuffer();
        newImagePath = await uploadToR2(fileName, Buffer.from(buffer), image.type);
      }

      try {
        const project = await tx.project.update({
          where: { id },
          data: {
            title,
            description,
            siteUrl,
            repoUrl,
            imagePath: newImagePath,
            skills: {
              set: skillIds.map((id) => ({ id })),
            },
          },
          include: { skills: true },
        });

        if (image && existingProject.imagePath) {
          const oldFileName = existingProject.imagePath.split('/').pop();
          if (oldFileName) {
            await deleteFromR2(oldFileName).catch((err) => {
              logError(
                "Erreur lors de la suppression de l'ancien fichier dans R2 : ",
                err,
              );
            });
          }
        }

        return project;
      } catch (dbError) {
        if (image && newImagePath !== existingProject.imagePath) {
          const newFileName = newImagePath.split('/').pop();
          if (newFileName) {
            await deleteFromR2(newFileName).catch((err) => {
              logError(
                'Erreur lors de la suppression du nouveau fichier dans R2 : ',
                err,
              );
            });
          }
        }
        throw dbError;
      }
    });

    const response = projectApiResponseSchema.parse({
      data: updatedProject,
      message: 'Projet mis à jour avec succès',
    });

    return NextResponse.json(response);
  } catch (error) {
    logError('Erreur lors de la mise à jour du projet:', error);

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
        const fileName = project.imagePath.split('/').pop();
        if (fileName) {
          await deleteFromR2(fileName).catch((err) => {
            logError('Erreur lors de la suppression du fichier dans R2 : ', err);
          });
        }
      }

      return deletedProject;
    });

    const response = projectApiResponseSchema.parse({
      data: deletedProject,
      message: 'Projet supprimé avec succès',
    });

    return NextResponse.json(response);
  } catch (error) {
    logError('Erreur lors de la suppression du projet:', error);

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
