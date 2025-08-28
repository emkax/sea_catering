'use server';

import { supabase } from '../lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

async function fetchMenu() {
  const { data, error } = await supabase.from('menu').select('*');

  if (error) {
    console.error("Error fetching menu:", error);
    return [];
  }

  return data;
}

export async function GET(request: NextRequest) {
  const menuData = await fetchMenu();

  return NextResponse.json(
    { payload: menuData },
    { status: 200 }
  );
}
