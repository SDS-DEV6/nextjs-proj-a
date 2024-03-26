import type { NextAuthConfig } from "next-auth";
import prisma from "@/lib/prismadb";

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedRoutes = ["/dashboard", "/comics", "/novels", "/users"]; // Add more protected routes as needed
      const isProtectedRoute = protectedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
      );

      if (isProtectedRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        const isOnAuthPages = nextUrl.pathname === "/";
        if (isOnAuthPages)
          return Response.redirect(new URL("/dashboard", nextUrl));
        return true;
      }
      return true;
    },
    session: ({ session, token }) => {
      //console.log("Session callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          ID: token.ID,
          username: token.username,
          email: token.email,
        },
      };
    },
    jwt: async ({ token, user }) => {
      const email = user?.email;
      if (email) {
        const dbUser = await prisma.admin.findUnique({
          where: {
            email: email, // Adjust this to match your database schema
          },
        });
        if (dbUser) {
          return {
            ...token,
            ID: dbUser.adminId,
            username: dbUser.username,
          };
        }
      }
      // Return the token unmodified if no user is found
      return token;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
