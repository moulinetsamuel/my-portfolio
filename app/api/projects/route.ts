import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: { skills: true },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Error fetching projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const siteUrl = formData.get('siteUrl') as string;
    const repoUrl = formData.get('repoUrl') as string;
    const skillIds = JSON.parse(formData.get('skillIds') as string);
    const image = formData.get('image') as File;

    // TODO: utiliser zod pour valider les données
    if (!title || !description || !siteUrl || !repoUrl || !skillIds || !image) {
      return NextResponse.json(
        {
          error: 'Title, description, siteUrl, repoUrl, skillIds, and image are required',
        },
        { status: 400 },
      );
    }
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${title}.png`;
    const imagePath = path.join(process.cwd(), 'public', 'images', 'projects', filename);
    await writeFile(imagePath, buffer);

    const project = await prisma.project.create({
      data: {
        title,
        description,
        imagePath: `/images/projects/${filename}`,
        siteUrl,
        repoUrl,
        skills: {
          connect: skillIds.map((id: number) => ({ id })),
        },
      },
      include: { skills: true },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Error creating project' }, { status: 500 });
  }
}
