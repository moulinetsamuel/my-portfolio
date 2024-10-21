import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { CV, cvSchema } from '@/lib/schemas/cv/cvSchemas';
import {
  CVApiError,
  cvApiErrorSchema,
  CVApiResponse,
  cvApiResponseSchema,
} from '@/lib/schemas/cv/cvApiResponseSchema';
import path from 'path';
import { unlink } from 'fs/promises';
import { cvFormSchema } from '@/lib/schemas/cv/cvFormSchema';
import { generateCVFileName } from '@/lib/utils/naming-utils';
import { saveFile } from '@/lib/utils/file-utils';
import logError from '@/lib/errors/logger';

export async function GET(): Promise<NextResponse<CV | CVApiError>> {
  try {
    const cv = await prisma.cV.findFirst();

    if (!cv) {
      const notFoundError = cvApiErrorSchema.parse({
        message: 'Aucun CV trouvé',
      });
      return NextResponse.json(notFoundError, { status: 404 });
    }

    const validatedCV = cvSchema.parse(cv);

    return NextResponse.json(validatedCV);
  } catch (error) {
    logError('Erreur lors de la récupération du CV', error);

    if (error instanceof z.ZodError) {
      const validationError = cvApiErrorSchema.parse({
        message: 'Erreur de validation des données du CV',
      });
      return NextResponse.json(validationError, { status: 400 });
    }

    const serverError = cvApiErrorSchema.parse({
      message: 'Erreur lors de la récupération du CV',
    });
    return NextResponse.json(serverError, { status: 500 });
  }
}

export async function POST(
  request: Request,
): Promise<NextResponse<CVApiResponse | CVApiError>> {
  try {
    const formData = await request.formData();
    const validatedCV = cvFormSchema.parse({ cv: formData.get('cv') });
    const cv = validatedCV.cv;

    const existingCV = await prisma.cV.findFirst();
    if (existingCV) {
      const newFileName = generateCVFileName();
      const newFilePath = path.join(process.cwd(), 'public', 'cv', newFileName);

      const updatedCV = await prisma.$transaction(async (tx) => {
        await saveFile(cv, newFilePath);

        try {
          const newCV = await tx.cV.update({
            where: { id: existingCV.id },
            data: {
              filePath: `/cv/${newFileName}`,
            },
          });

          await unlink(path.join(process.cwd(), 'public', existingCV.filePath)).catch(
            (err) => {
              logError("Erreur lors de la suppression de l'ancien fichier : ", err);
            },
          );

          return newCV;
        } catch (dbError) {
          await unlink(newFilePath).catch(() => {
            logError('Erreur lors de la suppression du nouveau fichier : ', newFilePath);
          });

          throw dbError;
        }
      });
      const response = cvApiResponseSchema.parse({
        ...updatedCV,
        message: 'CV mis à jour avec succès',
      });

      return NextResponse.json(response);
    }

    // sinon je crée un nouveau cv
    const fileName = generateCVFileName();
    const filePath = path.join(process.cwd(), 'public', 'cv', fileName);

    const createdCV = await prisma.$transaction(async (tx) => {
      await saveFile(cv, filePath);

      try {
        const newCV = await tx.cV.create({
          data: {
            filePath: `/cv/${fileName}`,
          },
        });

        return newCV;
      } catch (dbError) {
        await unlink(filePath).catch((err) => {
          logError('Erreur lors de la suppression du fichier : ', err);
        });

        throw dbError;
      }
    });

    const response = cvApiResponseSchema.parse({
      ...createdCV,
      message: 'CV ajouté avec succès',
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    logError("Erreur lors de l'ajout du CV:", error);

    if (error instanceof z.ZodError) {
      const validationError = cvApiErrorSchema.parse({
        message: 'Erreur de validation des données du CV',
      });
      return NextResponse.json(validationError, { status: 400 });
    }

    const serverError = cvApiErrorSchema.parse({
      message: "Erreur lors de l'ajout/la mise à jour du CV",
    });
    return NextResponse.json(serverError, { status: 500 });
  }
}
