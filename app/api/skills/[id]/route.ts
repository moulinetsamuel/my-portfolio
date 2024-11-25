import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { updateSkillFormSchema } from '@/lib/schemas/skill/skillFormSchema';
import {
  skillApiResponseSchema,
  skillApiErrorSchema,
  SkillApiResponse,
  SkillApiError,
} from '@/lib/schemas/skill/skillApiResponseSchema';
import { generateSkillIconFileName } from '@/lib/utils/naming-utils';
import logError from '@/lib/errors/logger';
import { deleteFromR2, uploadToR2 } from '@/lib/utils/r2Client';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse<SkillApiResponse | SkillApiError>> {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      throw new Error('ID invalide');
    }

    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    const validatedData = updateSkillFormSchema.parse(data);

    const { name, icon } = validatedData;

    const existingSkill = await prisma.skill.findUnique({ where: { id } });
    if (!existingSkill) {
      throw new Error('Compétence non trouvée');
    }

    const updatedSkill = await prisma.$transaction(async (tx) => {
      let newFilePath = existingSkill.iconPath;

      if (icon) {
        const fileName = generateSkillIconFileName(name);
        const buffer = await icon.arrayBuffer();
        newFilePath = await uploadToR2(fileName, Buffer.from(buffer), icon.type);
      }

      try {
        const skill = await tx.skill.update({
          where: { id },
          data: {
            name: validatedData.name,
            iconPath: newFilePath,
          },
        });

        if (icon && existingSkill.iconPath) {
          const oldFileName = existingSkill.iconPath.split('/').pop();
          if (oldFileName) {
            await deleteFromR2(oldFileName).catch((err) => {
              logError(
                "Erreur lors de la suppression de l'ancien fichier dans R2 : ",
                err,
              );
            });
          }
        }

        return skill;
      } catch (dbError) {
        if (icon && newFilePath !== existingSkill.iconPath) {
          const newFileName = newFilePath.split('/').pop();
          if (newFileName) {
            await deleteFromR2(newFileName).catch((err) => {
              logError(
                'Erreur lors de la suppression du nouveau fichier dans R2 : ',
                err,
              );
            });
          }
        }

        if (
          dbError instanceof Prisma.PrismaClientKnownRequestError &&
          dbError.code === 'P2002'
        ) {
          throw new Error('Une compétence avec ce nom existe déjà');
        }
        throw dbError;
      }
    });

    const response = skillApiResponseSchema.parse({
      data: updatedSkill,
      message: 'Compétence mise à jour avec succès',
    });

    return NextResponse.json(response);
  } catch (error) {
    logError('Erreur lors de la mise à jour de la compétence:', error);

    if (error instanceof z.ZodError) {
      const validationError = skillApiErrorSchema.parse({
        message: 'Erreur de validation des données de la compétence',
      });
      return NextResponse.json(validationError, { status: 400 });
    }

    if (
      error instanceof Error &&
      error.message === 'Une compétence avec ce nom existe déjà'
    ) {
      const duplicateError = skillApiErrorSchema.parse({
        message: error.message,
      });
      return NextResponse.json(duplicateError, { status: 409 }); // 409 Conflict
    }

    const serverError = skillApiErrorSchema.parse({
      message:
        error instanceof Error
          ? error.message
          : 'Erreur lors de la mise à jour de la compétence',
    });
    return NextResponse.json(serverError, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse<SkillApiResponse | SkillApiError>> {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      throw new Error('ID invalide');
    }

    const deletedSkill = await prisma.$transaction(async (tx) => {
      const skill = await tx.skill.findUnique({ where: { id } });
      if (!skill) {
        throw new Error('Compétence non trouvée');
      }

      const deletedSkill = await tx.skill.delete({ where: { id } });

      if (skill.iconPath) {
        const fileName = skill.iconPath.split('/').pop();
        if (fileName) {
          await deleteFromR2(fileName).catch((err) => {
            logError('Erreur lors de la suppression du fichier dans R2 : ', err);
          });
        }
      }

      return deletedSkill;
    });

    const response = skillApiResponseSchema.parse({
      data: deletedSkill,
      message: 'Compétence supprimée avec succès',
    });

    return NextResponse.json(response);
  } catch (error) {
    logError('Erreur lors de la suppression de la compétence:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const dbError = skillApiErrorSchema.parse({
        message: 'Erreur lors de la suppression de la compétence dans la base de données',
      });
      return NextResponse.json(dbError, { status: 500 });
    }

    const serverError = skillApiErrorSchema.parse({
      message:
        error instanceof Error
          ? error.message
          : 'Erreur lors de la suppression de la compétence',
    });
    return NextResponse.json(serverError, { status: 500 });
  }
}
