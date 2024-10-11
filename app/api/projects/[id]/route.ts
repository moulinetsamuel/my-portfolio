import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(params.id) },
      include: { skills: true },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ error: 'Error fetching project' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const siteUrl = formData.get('siteUrl') as string;
    const repoUrl = formData.get('repoUrl') as string;
    const skillIds = JSON.parse(formData.get('skillIds') as string);
    const image = formData.get('image') as File | null;

    const existingProject = await prisma.project.findUnique({
      where: { id: Number(params.id) },
      select: { imagePath: true },
    });

    let imagePath = existingProject?.imagePath || '';

    if (image) {
      // Delete old image if it exists
      if (existingProject?.imagePath) {
        const oldImagePath = path.join(
          process.cwd(),
          'public',
          existingProject.imagePath,
        );
        await unlink(oldImagePath).catch(() => {});
      }

      // Save new image
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${image.name}`;
      imagePath = `/images/projects/${filename}`;
      const fullPath = path.join(process.cwd(), 'public', imagePath);
      await writeFile(fullPath, buffer);
    }

    const project = await prisma.project.update({
      where: { id: Number(params.id) },
      data: {
        title,
        description,
        imagePath,
        siteUrl,
        repoUrl,
        skills: {
          set: skillIds.map((id: number) => ({ id })),
        },
      },
      include: { skills: true },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Error updating project' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(params.id) },
      select: { imagePath: true },
    });

    if (project?.imagePath) {
      const imagePath = path.join(process.cwd(), 'public', project.imagePath);
      await unlink(imagePath).catch(() => {});
    }

    await prisma.project.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Error deleting project' }, { status: 500 });
  }
}
