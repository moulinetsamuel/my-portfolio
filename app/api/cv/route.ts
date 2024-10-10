import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const cv = await prisma.cV.findFirst();
    return NextResponse.json(cv);
  } catch (error) {
    console.error('Error fetching CV:', error);
    return NextResponse.json({ error: 'Error fetching CV' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = 'CV_SAMUEL_MOULINET.pdf';
    const filePath = path.join(process.cwd(), 'public', 'cv', filename);
    await writeFile(filePath, buffer);

    const dbPath = `/cv/${filename}`;

    const cv = await prisma.cV.upsert({
      where: { id: 1 },
      update: { filePath: dbPath, uploadedAt: new Date() },
      create: { filePath: dbPath, uploadedAt: new Date() },
    });

    return NextResponse.json(cv);
  } catch (error) {
    console.error('Error uploading CV:', error);
    return NextResponse.json({ error: 'Error uploading CV' }, { status: 500 });
  }
}
