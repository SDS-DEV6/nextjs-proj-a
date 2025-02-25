import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    id: string;
    role: number;
  }

  interface User {
    id: string;
    role: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: number;
  }
}
