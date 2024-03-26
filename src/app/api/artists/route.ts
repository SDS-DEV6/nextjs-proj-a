import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const artistsRegistration = await prisma.artist.findMany();
    return NextResponse.json(artistsRegistration);
  } catch (err) {
    return NextResponse.json(
      { message: "Unable to fetch pending artists registration" },
      { status: 500 }
    );
  }
};
