import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const db = getDb();

    const existingUser = db.users.find(
      (u: any) =>
        u.email.trim().toLowerCase() === email.trim().toLowerCase()
    );

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'Account not found. Please create an account first.'
        },
        { status: 404 }
      );
    }

    if (existingUser.password !== password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid password. Please try again.'
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      token: 'mock-jwt-token-123',
      user: existingUser
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
