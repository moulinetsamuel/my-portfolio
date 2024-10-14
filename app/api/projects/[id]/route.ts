import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { updateProjectSchema, projectSchema } from '@/lib/schemas/projectSchema';
import path from 'path';
import { unlink, writeFile } from 'fs/promises';

// PUT /api/projects/[id] (Modifier un projet existant)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    const existingProject = await prisma.project.findUnique({ where: { id } });

    if (!existingProject) {
      return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as File | null;
    const siteUrl = formData.get('siteUrl') as string;
    const repoUrl = formData.get('repoUrl') as string;
    const skillIds = JSON.parse(formData.get('skillIds') as string) as number[];

    const updateData = updateProjectSchema.parse({
      title,
      description,
      siteUrl,
      repoUrl,
      skills: skillIds,
    });

    if (image) {
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

      if (existingProject.imagePath) {
        const oldImagePath = path.join(
          process.cwd(),
          'public',
          existingProject.imagePath,
        );
        await unlink(oldImagePath).catch(console.error);
      }

      updateData.imagePath = `/images/projects/${fileName}.png`;
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        ...updateData,
        skills: {
          set: updateData.skills ? updateData.skills.map((id) => ({ id })) : [],
        },
      },
      include: { skills: true },
    });

    const response = projectSchema.parse(updatedProject);

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Erreur de validation Zod:', error.errors);
      return NextResponse.json(
        { error: 'Données invalides pour la mise à jour du projet' },
        { status: 400 },
      );
    }

    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      return NextResponse.json(
        { error: 'Un projet avec ce titre existe déjà' },
        { status: 409 },
      );
    }

    console.error('Erreur lors de la mise à jour du projet:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du projet' },
      { status: 500 },
    );
  }
}

// DELETE /api/projects/[id] (Supprimer un projet existant)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    const project = await prisma.project.findUnique({ where: { id } });

    if (!project) {
      return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
    }

    if (project.imagePath) {
      const imagePath = path.join(process.cwd(), 'public', project.imagePath);
      await unlink(imagePath).catch(console.error);
    }

    await prisma.project.delete({ where: { id } });

    return NextResponse.json({ message: 'Projet supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du projet:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du projet' },
      { status: 500 },
    );
  }
}
