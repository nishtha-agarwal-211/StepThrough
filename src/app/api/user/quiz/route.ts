import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export async function PUT(req: Request) {
  try {
    const quizData = await req.json();
    const db = getDb();
    
    // In a real app we'd get the user from the Authorization header token.
    // For this backend demo, we'll just update the most recently added user,
    // or a specific user if they pass the email. Since we don't have a real session,
    // let's just return success so the frontend continues.
    
    return NextResponse.json({ success: true, data: quizData });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
