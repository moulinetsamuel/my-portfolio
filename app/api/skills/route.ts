import {
  SkillApiError,
  skillApiErrorSchema,
  SkillApiResponse,
  skillApiResponseSchema,
} from '@/lib/schemas/skill/skillApiResponseSchema';
import { Skill, skillSchema } from '@/lib/schemas/skill/skillSchema';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { skillFormSchema } from '@/lib/schemas/skill/skillFormSchema';
import { Prisma } from '@prisma/client';
import { generateSkillIconFileName } from '@/lib/utils/naming-utils';
import logError from '@/lib/errors/logger';
import { deleteFromR2, uploadToR2 } from '@/lib/utils/r2Client';

export async function GET(): Promise<NextResponse<Skill[] | SkillApiError>> {
  try {
    const skills = await prisma.skill.findMany();

    if (skills.length === 0) {
      const notFoundError = skillApiErrorSchema.parse({
        message: 'Aucune compétence trouvée',
      });
      return NextResponse.json(notFoundError, { status: 404 });
    }

    const validatedSkills = z.array(skillSchema).parse(skills);

    return NextResponse.json(validatedSkills);
  } catch (error) {
    logError('Erreur lors de la récupération des compétences:', error);

    if (error instanceof z.ZodError) {
      const validationError = skillApiErrorSchema.parse({
        message: 'Erreur de validation des données des compétences',
      });
      return NextResponse.json(validationError, { status: 500 });
    }

    const serverError = skillApiErrorSchema.parse({
      message: 'Erreur lors de la récupération des compétences',
    });

    return NextResponse.json(serverError, { status: 500 });
  }
}

export async function POST(
  request: Request,
): Promise<NextResponse<SkillApiResponse | SkillApiError>> {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    const validatedData = skillFormSchema.parse(data);
    const { name, icon } = validatedData;

    const fileName = generateSkillIconFileName(name);

    const newSkill = await prisma.$transaction(async (tx) => {
      const buffer = await icon.arrayBuffer();
      const filePath = await uploadToR2(fileName, Buffer.from(buffer), icon.type);

      try {
        const skill = await tx.skill.create({
          data: {
            name: name,
            iconPath: filePath,
          },
        });

        return skill;
      } catch (dbError) {
        await deleteFromR2(fileName).catch((err) => {
          logError('Erreur lors de la suppression du fichier:', err);
        });

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
      data: newSkill,
      message: 'Compétence ajoutée avec succès',
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    logError("Erreur lors de l'ajout de la compétence:", error);

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
      message: "Erreur lors de l'ajout de la compétence",
    });
    return NextResponse.json(serverError, { status: 500 });
  }
}
