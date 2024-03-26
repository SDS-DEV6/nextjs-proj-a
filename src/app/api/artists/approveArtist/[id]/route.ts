import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { sendApplicationStatusEmail } from "@/app/email/notifyArtist/email";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    const artist = await prisma.artist.findUnique({
      where: {
        artistId: id,
      },
      select: {
        email: true,
      },
    });

    if (!artist) {
      return NextResponse.json(
        { message: "Artist not found" },
        { status: 404 }
      );
    }

    await sendApplicationStatusEmail({
      to: artist.email,
      subject: "Your Application to Pinya.IO has been approved",
      html: `
      <h1>Artist Approved</h1>
      <p>Greetings! Pinya.Io wishes to welcome you, your application as an artist has been approved you may now logged in at </p>
      `,
    });

    const approveArtist = await prisma.artist.update({
      where: {
        artistId: id,
      },
      data: {
        verifiedStatus: true,
      },
    });

    if (!approveArtist) {
      return NextResponse.json(approveArtist);
    }

    return NextResponse.json(
      { message: "Artist successfully accepted and notified", id: id },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Unable to Approve Artist" },
      { status: 500 }
    );
  }
};
