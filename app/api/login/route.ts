'use server';

import { supabase } from '../lib/supabaseClient';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = body;
    

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // ✅ Fetch the user by email (expecting a single match)
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    // ✅ If email not found
    if (error || !user) {
      return NextResponse.json({ state: null }); // email does not exist
    }

    // ✅ Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ state: false , err : user.password,password}); // wrong password
    }

    // ✅ Success: set cookie
    const response = NextResponse.json({ state: true });
    response.cookies.set({
      name: 'user',
      value: email,
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      ...(rememberMe && { maxAge: 60 * 60 * 24 }), // 1 day
    });

    return response;

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
