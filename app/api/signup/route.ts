"use server"

import { NextResponse } from 'next/server';
import {supabase} from '../lib/supabaseClient';

import bcrypt from 'bcrypt';

async function fetchUsers(){
    const {data ,error} = await supabase
        .from('users')
        .select('*')
    if (error) {
        console.error("Error fetching testimonial:", error);
        return [];
    }
    return data;
}


async function validateUser(table,email){
    for (let i = 0;i < table.length;i++){
        if (table[i].email === email){
            return false
        }
    }   
    return true
    
}

export async function POST(request){
    const body = await request.json();
    const {firstName,lastName,email, password } = body;
    if (!firstName || !lastName || !email || !password){
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const users = await fetchUsers();

    if (await validateUser(users,email) === false){
        return NextResponse.json({success : false, error : 'Email has been registered'}, { status : 409 })
    }

    const fullName = firstName + ' ' + lastName;

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([{ fullName , email,password: hashedPassword }]);
    
    if (error) {
        console.error('Insert error:', error);
        return NextResponse.json({ error: 'Failed to insert user',cause:error }, { status: 500 });
    }
    
    return NextResponse.json({success : true})

}