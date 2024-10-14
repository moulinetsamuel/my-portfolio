import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { projectSchema, createProjectSchema } from '@/lib/schemas/projectSchema';
import { writeFile } from 'fs/promises';
import path from 'path';

// GET /api/projects (Récupérer tous les projets)
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: { skills: true },
    });

    if (projects.length === 0) {
      return NextResponse.json([]);
    }

    const validatedProjects = z.array(projectSchema).parse(projects);

    return NextResponse.json(validatedProjects);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // TODO: Utiliser un logger
      console.error('Erreur de validation Zod:', error.errors);
      return NextResponse.json(
        { error: 'Erreur de validation des données des projets' },
        { status: 400 },
      );
    }

    // TODO: Utiliser un logger
    console.error('Erreur lors de la récupération des projets:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des projets' },
      { status: 500 },
    );
  }
}

// POST /api/projects (Créer un nouveau projet)
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as File;
    const siteUrl = formData.get('siteUrl') as string;
    const repoUrl = formData.get('repoUrl') as string;
    const skillIds = JSON.parse(formData.get('skillIds') as string) as number[];

    if (
      !title ||
      !description ||
      !image ||
      !siteUrl ||
      !repoUrl ||
      skillIds.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Le titre, la description, l'image, l'URL du site, l'URL du dépôt et les compétences sont requis",
        },
        { status: 400 },
      );
    }

    const validatedData = createProjectSchema.parse({
      title,
      description,
      siteUrl,
      repoUrl,
      skills: skillIds,
    });

    if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
      return NextResponse.json(
        { error: "L'image doit être au format PNG ou JPEG" },
        { status: 400 },
      );
    }

    const fileName = `${Date.now()}_${title.toLowerCase().replace(/\s+/g, '_')}`;
    const imagePath = path.join(
      process.cwd(),
      'public',
      'images',
      'projects',
      `${fileName}.png`,
    );

    const fileBuffer = await image.arrayBuffer();

    await writeFile(imagePath, Buffer.from(fileBuffer));

    const newProject = await prisma.project.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        imagePath: `/images/projects/${fileName}.png`,
        siteUrl: validatedData.siteUrl,
        repoUrl: validatedData.repoUrl,
        skills: { connect: validatedData.skills.map((id) => ({ id })) },
      },
      include: { skills: true },
    });

    const response = projectSchema.parse(newProject);

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Erreur de validation Zod:', error.errors);
      return NextResponse.json(
        { error: 'Données invalides pour la création du projet' },
        { status: 400 },
      );
    }

    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      return NextResponse.json(
        { error: 'Un projet avec ce titre existe déjà' },
        { status: 409 },
      );
    }

    console.error('Erreur lors de la création du projet:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du projet' },
      { status: 500 },
    );
  }
}
