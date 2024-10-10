import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Récupérer toutes les compétences
export async function GET() {
  try {
    const skills = await prisma.skill.findMany();
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json({ error: 'Error fetching skills' }, { status: 500 });
  }
}
