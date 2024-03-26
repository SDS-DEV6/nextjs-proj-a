"use server";

import { signIn, signOut } from "@/auth";
import { db } from "@/db";
import type { Admin } from "@prisma/client";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { randomBytes } from "crypto";
import { redirect } from "next/navigation";
import { EmailNotVerifiedError } from "@/errors";
import { UsernameNotFoundError } from "@/components/userErrorNotFound";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await isUsersEmailVerified(formData.get("email") as string);
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }

    if (error instanceof EmailNotVerifiedError) {
      return error?.message;
    }

    throw error;
  }
}

const signUpSchema = z.object({
  username: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(3).max(255),
});

interface SignUpFormState {
  errors: {
    username?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}

export async function signUp(
  formState: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const result = signUpSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const isEmailExists = await findUserByEmail(result.data.email);

  if (isEmailExists) {
    return {
      errors: {
        email: ["Email already exists"],
      },
    };
  }

  const hashed = await generatePasswordHash(result.data.password);

  const verificationToken = generateEmailVerificationToken();

  let admin: Admin;
  try {
    admin = await db.admin.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashed,
        emailVerifyToken: verificationToken,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  await sendVerificationEmail(result.data.email, verificationToken);

  redirect(`/email/verify/send?email=${result.data.email}&verification_sent=1`);
}

export async function logout() {
  return await signOut();
}

export const findUserByEmail = async (email: string) => {
  return await db.admin.findFirst({
    where: {
      email,
    },
  });
};

export const findUser = async (username: string) => {
  return await db.admin.findFirst({
    where: {
      username,
    },
  });
};

const generatePasswordHash = async (password: string) => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};

const generateEmailVerificationToken = () => {
  return randomBytes(32).toString("hex");
};

const sendVerificationEmail = async (email: string, token: string) => {
  const emailData = {
    from: "noreply-verification@pinyastudio.com",
    to: email,
    subject: "Pinya.io: Admin Email Verification",
    html: `
        <p>Hi there, you've been invited as an Admin for Pinya.io inorder to get
        started please confirm your email by clicking on the link below.</p>
        <br>
        <a href="http://localhost:3000/email/verify?email=${email}&token=${token}">Verify Email</a>
        <br>
        If this was a mistake, please ignore this email.
        </p>
    `,
  };

  try {
    await transporter.sendMail(emailData);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};

export const resendVerificationEmail = async (email: string) => {
  const emailVerificationToken = generateEmailVerificationToken();

  try {
    await db.admin.update({
      where: { email },
      data: { emailVerifyToken: emailVerificationToken },
    });

    await sendVerificationEmail(email, emailVerificationToken);
  } catch (error) {
    return "Something went wrong.";
  }

  return "";
};

export const verifyEmail = (email: string) => {
  return db.admin.update({
    where: { email },
    data: {
      emailVerifiedAt: new Date(),
      emailVerifyToken: null,
    },
  });
};

export const isUsersEmailVerified = async (email: string) => {
  const admin = await db.admin.findFirst({
    where: { email },
  });

  if (!admin) return true;

  if (!admin?.emailVerifiedAt)
    throw new EmailNotVerifiedError(`EMAIL_NOT_VERIFIED:${email}`);

  return true;
};

export const getEmailFromUsername = async (username: string) => {
  const admin = await db.admin.findFirst({
    where: { username }, // Assuming 'username' is a field on your 'admin' table
  });

  if (!admin) {
    throw new UsernameNotFoundError("Username not found.");
  }

  return admin.email;
};
