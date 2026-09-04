import { NextResponse } from 'next/server';

// Diagnostic route — remove before production
export async function GET() {
  return NextResponse.json({ message: 'DB check route disabled.' });
}
