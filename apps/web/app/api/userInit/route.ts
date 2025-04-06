
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET() {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) return NextResponse.json({ error: 'No token' }, { status: 401 });

    const user = jwt.verify(token, JWT_SECRET) as { userId: string };
    return NextResponse.json({ userId: user.userId });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }
}