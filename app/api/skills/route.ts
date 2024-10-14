import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import {
  createSkillSchema,
  skillApiResponseSchema,
  skillSchema,
} from '@/lib/schemas/skillSchema';
import { writeFile } from 'fs/promises';
import path from 'path';

// GET /api/skills (Récupérer toutes les compétences)
export async function GET() {
  try {
    // Récupérer toutes les compétences de la base de données
    const skills = await prisma.skill.findMany();

    // Si aucune compétence n'est trouvée, retourner une réponse 404
    if (skills.length === 0) {
      return NextResponse.json([]);
    }

    // Valider les compétences récupérées avec le schéma de compétence
    const validatedSkills = z.array(skillSchema).parse(skills);

    // Retourner les compétences validées
    return NextResponse.json(validatedSkills);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // TODO: Utiliser un logger
      console.error('Erreur de validation Zod:', error.errors);
      return NextResponse.json(
        { error: 'Erreur de validation des données des compétences' },
        { status: 400 },
      );
    }

    // TODO: Utiliser un logger
    console.error('Erreur lors de la récupération des compétences:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des compétences' },
      { status: 500 },
    );
  }
}

// POST /api/skills (Créer une nouvelle compétence)
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const icon = formData.get('icon') as File;

    if (!name || !icon) {
      return NextResponse.json(
        { error: "Le nom et l'icône sont requis" },
        { status: 400 },
      );
    }

    // Valider le nom de la compétence
    const validatedData = createSkillSchema.omit({ iconPath: true }).parse({ name });

    // Vérifier le type de fichier
    if (icon.type !== 'image/svg+xml') {
      return NextResponse.json(
        { error: "L'icône doit être au format SVG" },
        { status: 400 },
      );
    }

    // Générer un nom de fichier unique
    const fileName = `${Date.now()}_${name.toLowerCase().replace(/\s+/g, '_')}.svg`;
    const filePath = path.join(process.cwd(), 'public', 'icons', 'skills', fileName);

    // Lire le contenu du fichier
    const fileBuffer = await icon.arrayBuffer();

    // Écrire le fichier
    await writeFile(filePath, Buffer.from(fileBuffer));

    // Créer la nouvelle compétence dans la base de données
    const newSkill = await prisma.skill.create({
      data: {
        name: validatedData.name,
        iconPath: `/icons/skills/${fileName}`,
      },
    });

    // Valider la réponse avec le schéma de réponse API
    const response = skillApiResponseSchema.parse({
      ...newSkill,
      message: 'Compétence créée avec succès',
    });

    // Retourner la réponse validée avec un statut 201 (Created)
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Erreur de validation Zod:', error.errors);
      return NextResponse.json(
        { error: 'Données invalides pour la création de la compétence' },
        { status: 400 },
      );
    }

    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      return NextResponse.json(
        { error: 'Une compétence avec ce nom existe déjà' },
        { status: 409 },
      );
    }

    console.error('Erreur lors de la création de la compétence:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la compétence' },
      { status: 500 },
    );
  }
}
