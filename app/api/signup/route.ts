"use server";

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../lib/supabaseClient";
import bcrypt from "bcryptjs";

async function fetchUsers() {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return data ?? [];
}

async function validateUser(users: any[], email: string) {
  return !users.some((user) => user.email === email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password } = body;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const users = await fetchUsers();

    if (!(await validateUser(users, email))) {
      return NextResponse.json(
        { success: false, error: "Email has been registered" },
        { status: 409 }
      );
    }

    const fullName = `${firstName} ${lastName}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase
      .from("users")
      .insert([{ fullName, email, password: hashedPassword }]);

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to insert user", cause: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
