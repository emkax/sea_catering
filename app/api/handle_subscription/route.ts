'use server';

import { supabase } from '../lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

// GET handler
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get('email');

  const { data, error } = await supabase.from("subscription").select('*'); 

  if (error) {
    console.error("error fetching database");
    return NextResponse.json(
      { success: false, error: "Failed to fetch subscription data" },
      { status: 500 }
    );
  }

  for (let i = 0; i < data.length; i++) {
    if (userEmail === data[i].email) {
      return NextResponse.json(
        { success: true, payload: data[i] },
        { status: 200 }
      );
    }
  }

  return NextResponse.json({ success: false }, { status: 200 });
}

// helper function (kept as-is)
async function fetchMenu() {
  const { data, error } = await supabase.from('menu').select('*');
  if (error) {
    console.error("Error fetching menu:", error);
    return [];
  }
  return data;
}

// POST handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, phone, plan, mealType, deliveryDays, allergies, email } = body;

    if (!fullName || !phone || !plan || !mealType || !deliveryDays || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!Array.isArray(mealType) || mealType.length === 0) {
      return NextResponse.json({ error: "At least one meal type is required" }, { status: 400 });
    }

    if (!Array.isArray(deliveryDays) || deliveryDays.length === 0) {
      return NextResponse.json({ error: "At least one delivery day is required" }, { status: 400 });
    }

    const menuFetch = await fetchMenu();
    const mapPrice: Record<string, number> = {};

    for (let i = 0; i < menuFetch.length; i++) {
      mapPrice[menuFetch[i].plan] = menuFetch[i].price;
    }

    if (!mapPrice[plan]) {
      return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 });
    }

    const totalPrice = mapPrice[plan] * mealType.length * deliveryDays.length * 4.3;

    const { data, error } = await supabase
      .from('subscription')
      .insert([{
        fullName,
        phone,
        plan,
        mealType,
        deliveryDays,
        allergies: allergies || '',
        totalPrice,
        email
      }]);

    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data, price: totalPrice }, { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
