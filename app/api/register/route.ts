import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(
  request: Request, 
) {
  const body = await request.json();
  const { 
    email,
    name,
    password,
   } = body;

   const hashedPassword = await bcrypt.hash(password, 12);


  let user;
  try {
     user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      }
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'user is already exist' }, { status: 500 })

  }


 return NextResponse.json(user);
}
