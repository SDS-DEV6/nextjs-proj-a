"use client";

import { findUserByEmail, verifyEmail } from "@/actions/auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Image from "next/image";
import PikuImage from "../../../assets/piku-ad.png";

export default function VerifyEmail() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState("Error verifying your email");

  useEffect(() => {
    const emailVerification = async () => {
      try {
        if (!email || !token) {
          throw new Error("Missing required fields");
        }

        const admin = await findUserByEmail(email);
        if (!admin) {
          throw new Error("Invalid verification token");
        }

        if (token !== admin.emailVerifyToken) {
          throw new Error("Invalid verification token");
        }

        // Update admin verification status in database
        await verifyEmail(admin.email);

        setResult(
          "Email verified successfully. Please proceed to admin login page."
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error verifying email:", error);
      }
    };

    emailVerification();
  }, [email, token]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center flex-col h-full w-full p-10 bg-white">
          <div className="flex flex-col justify-center items-center">
            <Image src={PikuImage} width={197} height={159} alt="Piku-ad" />
            <div className="bg-slate-50 p-6 border rounded-2xl font-quicksand text-blackberry-300">
              <div>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-2xl font-extrabold font-raleway">
                    <div className="mb-4">
                      {isLoading ? "Verifying email...." : result}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Link href="/" className="bg-white py-3 px-2 rounded">
                    Back to Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
