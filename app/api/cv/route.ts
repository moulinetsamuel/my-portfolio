import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cvSchema, cvUploadSchema, cvApiResponseSchema } from '@/lib/schemas/cvSchemas';
import { z } from 'zod';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

const CV_STORAGE_PATH = path.join(process.cwd(), 'public', 'cv');
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// GET /api/cv (Récupération du CV)
export async function GET() {
  try {
    // Récupération du CV en base de données
    const cv = await prisma.cV.findFirst();

    // Si aucun CV n'est trouvé, renvoyer une erreur 404
    if (!cv) {
      return NextResponse.json({ error: 'No CV found' }, { status: 404 });
    }

    // Validation du CV récupéré avec le schéma Zod
    const validatedCV = cvSchema.parse(cv);

    // Renvoi du CV validé
    return NextResponse.json(validatedCV);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // TODO: Utiliser un logger
      console.error('Error validating CV:', error.errors);
      return NextResponse.json({ error: 'Error validating CV' }, { status: 500 });
    }

    // TODO: Utiliser un logger
    console.error('Error fetching CV:', error);
    return NextResponse.json({ error: 'Error fetching CV' }, { status: 500 });
  }
}

// POST /api/cv (Création ou mise à jour du CV)
export async function POST(request: Request) {
  try {
    // Récupération du fichier uploadé
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    // Si aucun fichier n'est fourni, renvoyer une erreur 400
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Vérification de la taille du fichier
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds the limit' }, { status: 400 });
    }

    // Vérification du type de fichier
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }

    // Validation du fichier uploadé avec le schéma Zod
    const validatedFile = cvUploadSchema.parse({ file });

    // Récupération du buffer du fichier uploadé et génération du nom de fichier unique avec un timestamp actuel
    const buffer = await validatedFile.file.arrayBuffer();
    const fileName = `CV_SAMUEL_MOULINET_${Date.now()}.pdf`;
    const filePath = path.join(CV_STORAGE_PATH, fileName);

    // Récupération du CV existant en base de données
    const existingCV = await prisma.cV.findFirst();

    // Si un CV existe déjà, supprimer l'ancien fichier et mettre à jour le cv en base de données avec le nouveau fichier uploadé
    if (existingCV) {
      // Suppression de l'ancien fichier
      try {
        await unlink(path.join(CV_STORAGE_PATH, existingCV.filePath.replace('/cv/', '')));
      } catch (error) {
        // TODO: Utiliser un logger
        console.error('Error deleting old CV file:', error);
      }

      // Mise à jour du cv en base de données avec le nouveau fichier uploadé
      await prisma.cV.update({
        where: { id: existingCV.id },
        data: {
          filePath: `/cv/${fileName}`,
          uploadedAt: new Date().toISOString(),
        },
      });
    } else {
      // Création d'un nouveau cv en base de données avec le fichier uploadé
      await prisma.cV.create({
        data: {
          filePath: `/cv/${fileName}`,
          uploadedAt: new Date().toISOString(),
        },
      });
    }

    // Écriture du buffer du fichier uploadé dans le dossier public/cv
    await writeFile(filePath, Buffer.from(buffer));

    // Récupération du CV mis à jour en base de données
    const updatedCV = await prisma.cV.findFirst();

    // Si le CV mis à jour n'est pas trouvé, renvoyer une erreur
    if (!updatedCV) {
      throw new Error('Failed to retrieve updated CV');
    }

    // Validation du CV mis à jour avec le schéma Zod
    const validatedCV = cvApiResponseSchema.parse({
      ...updatedCV,
      message: existingCV ? 'CV updated successfully' : 'CV uploaded successfully',
    });

    // Renvoi du CV validé
    return NextResponse.json(validatedCV);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // TODO: Utiliser un logger
      console.error('Error validating CV upload:', error.errors);
      return NextResponse.json({ error: 'Invalid CV data' }, { status: 400 });
    }

    // TODO: Utiliser un logger
    console.error('Error uploading CV:', error);
    return NextResponse.json({ error: 'Error uploading CV' }, { status: 500 });
  }
}
