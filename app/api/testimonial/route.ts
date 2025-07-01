'use server';

import { supabase } from '../lib/supabaseClient';

async function fetchTestimonial() {
  const { data, error } = await supabase.from('testimonial').select('*');
  if (error) {
    console.error("Error fetching testimonial:", error);
    return [];
  }
  return data;
}

export async function GET(request) {
  const testimonial = await fetchTestimonial();
  return new Response(JSON.stringify({ payload: testimonial }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, message, rating } = body;

    if (!name || !message || !rating) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    const { data, error } = await supabase
      .from('testimonial')
      .insert([{ name, message, rating }]);

    if (error) {
      console.error("Supabase insert error:", error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
