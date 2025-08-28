"use server";

import { supabase } from "../lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

async function fetchTestimonial() {
  const { data, error } = await supabase.from("testimonial").select("*");

  if (error) {
    console.error("Error fetching testimonial:", error);
    return NextResponse.json({ payload: [] }, { status: 200 });
  }

  return data ?? NextResponse.json({ payload: [] }, { status: 200 });;
}

export async function GET(request: NextRequest) {
  const testimonial = await fetchTestimonial();

  return NextResponse.json(
    { payload: testimonial },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message, rating } = body;

    if (!name || !message || !rating) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("testimonial")
      .insert([{ name, message, rating }]);

    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 } // 201 Created
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
