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
import { cvFormSchema } from '@/lib/schemas/cv/cvFormSchema';
import { generateCVFileName } from '@/lib/utils/naming-utils';
import logError from '@/lib/errors/logger';
import { deleteFromR2, uploadToR2 } from '@/lib/utils/r2Client';

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
    const data = Object.fromEntries(formData.entries());
    const validatedCV = cvFormSchema.parse(data);
    const cv = validatedCV.cv as File;

    const existingCV = await prisma.cV.findFirst();
    if (existingCV) {
      const newFileName = generateCVFileName();

      const updatedCV = await prisma.$transaction(async (tx) => {
        const buffer = await cv.arrayBuffer();
        const fileUrl = await uploadToR2(newFileName, Buffer.from(buffer), cv.type);

        try {
          const newCV = await tx.cV.update({
            where: { id: existingCV.id },
            data: {
              filePath: fileUrl,
            },
          });

          // Suppression de l'ancien fichier dans R2
          const oldFileName = existingCV.filePath.split('/').pop();
          if (oldFileName) {
            await deleteFromR2(oldFileName).catch((err) => {
              logError(
                "Erreur lors de la suppression de l'ancien fichier dans R2 : ",
                err,
              );
            });
          }

          return newCV;
        } catch (dbError) {
          // En cas d'erreur, on supprime le nouveau fichier de R2
          await deleteFromR2(newFileName).catch(() => {
            logError(
              'Erreur lors de la suppression du nouveau fichier dans R2 : ',
              newFileName,
            );
          });

          throw dbError;
        }
      });

      const response = cvApiResponseSchema.parse({
        data: updatedCV,
        message: 'CV mis à jour avec succès',
      });

      return NextResponse.json(response);
    }

    // Création d'un nouveau CV
    const fileName = generateCVFileName();

    const createdCV = await prisma.$transaction(async (tx) => {
      const buffer = await cv.arrayBuffer();
      const fileUrl = await uploadToR2(fileName, Buffer.from(buffer), cv.type);

      try {
        const newCV = await tx.cV.create({
          data: {
            filePath: fileUrl,
          },
        });

        return newCV;
      } catch (dbError) {
        // En cas d'erreur, on supprime le fichier de R2
        await deleteFromR2(fileName).catch((err) => {
          logError('Erreur lors de la suppression du fichier dans R2 : ', err);
        });

        throw dbError;
      }
    });

    const response = cvApiResponseSchema.parse({
      data: createdCV,
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
      message: "Erreur lors de l'ajout ou la mise à jour du CV",
    });
    return NextResponse.json(serverError, { status: 500 });
  }
}
