import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies(); // ✅ async in Next.js 15+
  const user = cookieStore.get("user");

  console.log("All cookies:", cookieStore.getAll());
  console.log("User cookie:", user);

  if (!user) {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  console.log("User authenticated, showing subscription page");

  return NextResponse.json({ valid: true }, { status: 200 });
}
