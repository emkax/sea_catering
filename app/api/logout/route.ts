'use server';

import { NextResponse } from 'next/server';

export async function DELETE() {
  const response = NextResponse.json({ message: 'Logged out' });

  response.cookies.set({
    name: 'user',
    value: '',
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    expires: new Date(0), // Expire immediately
  });

  return response;
}
