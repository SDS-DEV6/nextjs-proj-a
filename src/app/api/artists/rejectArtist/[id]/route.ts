import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { sendApplicationStatusEmail } from "@/app/email/notifyArtist/email";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const reason = await request.json();
    const { rejectionReason } = reason;

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
      subject: "Your Application to Pinya.IO has been rejected",
      html:
        `
          <h1>Artist Application Rejected</h1>
          <p>Greetings! We regret to inform you that we are unable to accept your application due to </p>` +
        rejectionReason +
        `<p>However, we appreciate your interest and effort. If you believe this decision was made in error, or if you wish to improve your portfolio and reapply, 
          we welcome you to do so. We encourage artists to continue honing their craft and consider reapplying in the future.</p>
          `,
    });

    const rejectArtist = await prisma.artist.delete({
      where: {
        artistId: id,
      },
    });

    if (!rejectArtist) {
      return NextResponse.json(rejectArtist);
    }

    return NextResponse.json(
      { message: "Artist successfully rejected and removed", id: id },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Unable to Reject Artist" },
      { status: 500 }
    );
  }
};
