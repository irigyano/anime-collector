import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        avatar: "/images/KEKW.webp",
        watchedWorks: [],
        watchingWorks: [],
        followingWorks: [],
      },
    });

    return NextResponse.json({
      user: {
        username: user.username,
      },
    });
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return new NextResponse(
        JSON.stringify({ error: "The username has been used" }),
        {
          status: 409,
        }
      );
    }
    console.log("error!!!!!", err.message);
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
