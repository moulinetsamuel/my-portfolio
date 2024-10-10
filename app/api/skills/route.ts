import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const skills = await prisma.skill.findMany();
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json({ error: 'Error fetching skills' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const name = data.get('name') as string;
    const file = data.get('icon') as File;

    if (!name || !file) {
      return NextResponse.json({ error: 'Name and icon are required' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), 'public', 'icons', 'skills', filename);
    await writeFile(filePath, buffer);

    const skill = await prisma.skill.create({
      data: {
        name,
        iconPath: `/icons/skills/${filename}`,
      },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json({ error: 'Error creating skill' }, { status: 500 });
  }
}
