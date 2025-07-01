'use server';

import { supabase } from '../lib/supabaseClient';

async function fetchMenu() {
  const { data, error } = await supabase.from('menu').select('*');

  if (error) {
    console.error("Error fetching menu:", error);
    return [];
  }

  return data;
}

export async function GET(request) {
  const menuData = await fetchMenu();

  return new Response(
    JSON.stringify({
      payload: menuData,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
