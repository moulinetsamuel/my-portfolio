import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Récupérer tous les projets avec leurs skills
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
