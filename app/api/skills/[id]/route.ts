import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.formData();
    const name = data.get('name') as string;
    const file = data.get('icon') as File | null;

    const skill = await prisma.skill.findUnique({ where: { id: Number(params.id) } });
    if (!skill) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }

    let iconPath = skill.iconPath;

    if (file) {
      // Delete old icon
      const oldFilePath = path.join(process.cwd(), 'public', skill.iconPath);
      await unlink(oldFilePath);

      // Save new icon
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name}`;
      const newFilePath = path.join(process.cwd(), 'public', 'icons', 'skills', filename);
      await writeFile(newFilePath, buffer);
      iconPath = `/icons/skills/${filename}`;
    }

    const updatedSkill = await prisma.skill.update({
      where: { id: Number(params.id) },
      data: { name, iconPath },
    });

    return NextResponse.json(updatedSkill);
  } catch (error) {
    console.error('Error updating skill:', error);
    return NextResponse.json({ error: 'Error updating skill' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const skill = await prisma.skill.findUnique({ where: { id: Number(params.id) } });
    if (!skill) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }

    // Delete icon file
    const filePath = path.join(process.cwd(), 'public', skill.iconPath);
    await unlink(filePath);

    await prisma.skill.delete({ where: { id: Number(params.id) } });

    return NextResponse.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill:', error);
    return NextResponse.json({ error: 'Error deleting skill' }, { status: 500 });
  }
}
