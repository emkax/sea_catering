'use server'

import { supabase } from '../lib/supabaseClient';

export async function GET(request){
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get('email');

  const { data,error } = await supabase.from("subscription").select('*'); 

  if (error){
    console.error("error fetching database");
    return [];
  }

  for (let i = 0; i < data.length;i++){
    if (userEmail === data[i].email){
        return new Response(JSON.stringify({ success: true, payload : data[i]}), {
          status: 400,
        });
  
    }
  }

  return new Response(JSON.stringify({ success: false }), {
    status: 200,
  });

  
}

async function fetchMenu() {
  const { data, error } = await supabase.from('menu').select('*');

  if (error) {
    console.error("Error fetching menu:", error);
    return [];
  }

  return data;
}

export async function POST(request){
  try {
    const body = await request.json();
    const { fullName, phone, plan, mealType, deliveryDays, allergies, email } = body;
    
    // Log the received data for debugging
    console.log("Received data:", body);
    
    // Only check required fields (allergies is optional)
    if (!fullName || !phone || !plan || !mealType || !deliveryDays || !email) {
      console.log("Missing required fields:", {
        fullName: !!fullName,
        phone: !!phone,
        plan: !!plan,
        mealType: !!mealType,
        deliveryDays: !!deliveryDays,
        email: !!email
      });
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
      });
    }
    
    // Additional validation for arrays
    if (!Array.isArray(mealType) || mealType.length === 0) {
      return new Response(JSON.stringify({ error: "At least one meal type is required" }), {
        status: 400,
      });
    }
    
    if (!Array.isArray(deliveryDays) || deliveryDays.length === 0) {
      return new Response(JSON.stringify({ error: "At least one delivery day is required" }), {
        status: 400,
      });
    }
    
    const menuFetch = await fetchMenu();
    
    let mapPrice = {};
    for (let i = 0; i < menuFetch.length; i++){
        mapPrice[menuFetch[i].plan] = menuFetch[i].price;
    }

    // Check if plan exists in menu
    if (!mapPrice[plan]) {
      return new Response(JSON.stringify({ error: "Invalid plan selected" }), {
        status: 400,
      });
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
        allergies: allergies || '', // Handle empty allergies
        totalPrice,
        email
      }]);

    if (error) {
      console.error("Supabase insert error:", error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true, data, price: totalPrice }), {
      status: 200,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}