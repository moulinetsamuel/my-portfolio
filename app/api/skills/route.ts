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
import path from 'path';
import { unlink, writeFile } from 'fs/promises';
import { Prisma } from '@prisma/client';

export async function GET(): Promise<NextResponse<Skill[] | SkillApiError>> {
  try {
    const skills = await prisma.skill.findMany();

    if (skills.length === 0) {
      return NextResponse.json([]);
    }

    const validatedSkills = z.array(skillSchema).parse(skills);

    return NextResponse.json(validatedSkills);
  } catch (error) {
    // TODO: Utiliser un logger
    console.error('Erreur lors de la récupération des compétences:', error);

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

// POST /api/skills (Créer une nouvelle compétence)
export async function POST(
  request: Request,
): Promise<NextResponse<SkillApiResponse | SkillApiError>> {
  try {
    const formData = await request.formData();
    const validatedData = skillFormSchema.parse({
      name: formData.get('name'),
      icon: formData.get('icon'),
    });
    const { name, icon } = validatedData;

    const fileName = `${Date.now()}-${name.toLowerCase().replace(/\s+/g, '_')}.svg`;
    const filePath = path.join(process.cwd(), 'public', 'icons', 'skills', fileName);

    // Utilisation d'une transaction Prisma
    const newSkill = await prisma.$transaction(async (tx) => {
      // Écriture du fichier
      const arrayBuffer = await icon.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await writeFile(filePath, buffer);

      try {
        // Création de la compétence dans la base de données
        const skill = await tx.skill.create({
          data: {
            name: name,
            iconPath: `/icons/skills/${fileName}`,
          },
        });

        return skill;
      } catch (dbError) {
        // Si l'enregistrement en base de données échoue, supprimez le fichier
        await unlink(filePath);

        // Vérifiez si l'erreur est due à un nom en double
        if (
          dbError instanceof Prisma.PrismaClientKnownRequestError &&
          dbError.code === 'P2002'
        ) {
          throw new Error('Une compétence avec ce nom existe déjà');
        }
        throw dbError;
      }
    });

    // Validation de la réponse
    const response = skillApiResponseSchema.parse({
      ...newSkill,
      message: 'Compétence ajoutée avec succès',
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    // TODO: Utiliser un logger
    console.error("Erreur lors de l'ajout de la compétence:", error);

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
