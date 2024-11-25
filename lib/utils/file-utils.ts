import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function saveFile(file: File, filePath: string) {
  // Vérifie que le dossier existe, sinon le crée
  const directory = path.dirname(filePath); // Extrait le chemin du dossier
  await mkdir(directory, { recursive: true }); // Crée le dossier récursivement si besoin

  // Convertit le fichier en ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Sauvegarde le fichier
  await writeFile(filePath, buffer);
}
