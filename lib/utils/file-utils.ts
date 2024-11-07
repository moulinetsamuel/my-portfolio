import { writeFile } from 'fs/promises';

export async function saveFile(file: File, filePath: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await writeFile(filePath, buffer);
}
