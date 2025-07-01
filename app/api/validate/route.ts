import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies(); // ✅ Add await for Next.js 15+
  const user = cookieStore.get('user');

  console.log('All cookies:', cookieStore.getAll());
  console.log('User cookie:', user);

  if (!user) {
    return NextResponse.json({status:400 , valid:false});
  }

  console.log("User authenticated, showing subscription page");
  
  // Pass the user session info to the client component
  return NextResponse.json({status:200,valid:true});
}