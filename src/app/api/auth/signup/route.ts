import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const db = getDb();
    
    const existingUser = db.users.find((u: any) => u.email === email);
    if (existingUser) {
      return NextResponse.json({ success: false, error: 'Email is already registered. Please log in.' }, { status: 400 });
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password, // In a real app, hash this!
      quizData: {}
    };

    db.users.push(newUser);
    saveDb(db);

    return NextResponse.json({ success: true, token: 'mock-jwt-token-123', user: newUser });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
