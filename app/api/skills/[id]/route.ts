import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { updateSkillSchema, skillApiResponseSchema } from '@/lib/schemas/skillSchema';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

// PUT /api/skills/[id] (Modifier une compétence existante)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const icon = formData.get('icon') as File | null;

    const existingSkill = await prisma.skill.findUnique({ where: { id } });
    if (!existingSkill) {
      return NextResponse.json({ error: 'Compétence non trouvée' }, { status: 404 });
    }

    // Valider les données de mise à jour
    const updateData = updateSkillSchema.parse({ name });

    if (icon) {
      if (icon.type !== 'image/svg+xml') {
        return NextResponse.json(
          { error: "L'icône doit être au format SVG" },
          { status: 400 },
        );
      }

      const fileName = `${Date.now()}_${name.toLowerCase().replace(/\s+/g, '_')}.svg`;
      const filePath = path.join(process.cwd(), 'public', 'icons', 'skills', fileName);

      const fileBuffer = await icon.arrayBuffer();
      await writeFile(filePath, Buffer.from(fileBuffer));

      // Supprimer l'ancienne icône si elle existe
      if (existingSkill.iconPath) {
        const oldFilePath = path.join(process.cwd(), 'public', existingSkill.iconPath);
        await unlink(oldFilePath).catch(console.error);
      }

      updateData.iconPath = `/icons/skills/${fileName}`;
    }

    const updatedSkill = await prisma.skill.update({
      where: { id },
      data: updateData,
    });

    // Valider la réponse avec le schéma de réponse API
    const response = skillApiResponseSchema.parse({
      ...updatedSkill,
      message: 'Compétence mise à jour avec succès',
    });

    // Retourner la réponse validée
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // TODO: Utiliser un logger
      console.error('Erreur de validation Zod:', error.errors);
      return NextResponse.json(
        { error: 'Données invalides pour la mise à jour de la compétence' },
        { status: 400 },
      );
    }

    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      return NextResponse.json(
        { error: 'Une compétence avec ce nom existe déjà' },
        { status: 409 },
      );
    }

    // TODO: Utiliser un logger
    console.error('Erreur lors de la mise à jour de la compétence:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la compétence' },
      { status: 500 },
    );
  }
}

// DELETE /api/skills/[id] (Supprimer une compétence)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    const skill = await prisma.skill.findUnique({ where: { id } });

    if (!skill) {
      return NextResponse.json({ error: 'Compétence non trouvée' }, { status: 404 });
    }

    // Supprimer l'icône si elle existe
    if (skill.iconPath) {
      const filePath = path.join(process.cwd(), 'public', skill.iconPath);
      await unlink(filePath).catch(console.error);
    }

    await prisma.skill.delete({ where: { id } });

    // Retourner la réponse validée
    return NextResponse.json({ message: 'Compétence supprimée avec succès' });
  } catch (error) {
    // TODO: Utiliser un logger
    console.error('Erreur lors de la suppression de la compétence:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la compétence' },
      { status: 500 },
    );
  }
}
