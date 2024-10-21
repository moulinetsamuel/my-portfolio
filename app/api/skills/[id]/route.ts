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
import { unlink } from 'fs/promises';
import path from 'path';
import { generateSkillIconFileName } from '@/lib/utils/naming-utils';
import { saveFile } from '@/lib/utils/file-utils';
import logError from '@/lib/errors/logger';

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
    const validatedData = updateSkillFormSchema.parse({
      name: formData.get('name'),
      icon: formData.get('icon'),
    });

    const { name, icon } = validatedData;

    const existingSkill = await prisma.skill.findUnique({ where: { id } });
    if (!existingSkill) {
      throw new Error('Compétence non trouvée');
    }

    const fileName = generateSkillIconFileName(name);
    const filePath = path.join(process.cwd(), 'public', 'icons', 'skills', fileName);

    const updatedSkill = await prisma.$transaction(async (tx) => {
      if (icon) {
        await saveFile(icon, filePath);
      }

      try {
        const skill = await tx.skill.update({
          where: { id },
          data: {
            name: validatedData.name,
            iconPath: icon ? `/icons/skills/${fileName}` : existingSkill.iconPath,
          },
        });

        return skill;
      } catch (dbError) {
        if (icon) {
          await unlink(filePath).catch((err) => {
            logError('Erreur lors de la suppression du nouveau fichier : ', err);
          });
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

    if (existingSkill.iconPath && icon) {
      const fullOldPath = path.join(process.cwd(), 'public', existingSkill.iconPath);
      await unlink(fullOldPath).catch((err) => {
        logError("Erreur lors de la suppression de l'ancien fichier : ", err);
      });
    }

    const response = skillApiResponseSchema.parse({
      ...updatedSkill,
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
        const filePath = path.join(process.cwd(), 'public', skill.iconPath);
        await unlink(filePath).catch((err) => {
          logError('Erreur lors de la suppression du fichier : ', err);
        });
      }

      return deletedSkill;
    });

    const response = skillApiResponseSchema.parse({
      ...deletedSkill,
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
