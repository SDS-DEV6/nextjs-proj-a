import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const novelForApproval = await prisma.novel.findMany();
    return NextResponse.json(novelForApproval);
  } catch (err) {
    return NextResponse.json(
      { message: "Unable to fetch pending novels for approval" },
      { status: 500 }
    );
  }
};
