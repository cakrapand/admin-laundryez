import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import prisma from "./lib/db";

declare module "next-auth" {
  interface User {
    isSupeAdmin: boolean;
  }
  interface Session {
    user: User;
  }
  interface JWT {
    isSupeAdmin: boolean;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.isSupeAdmin = token.isSuperAdmin as boolean;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;

      const admin = await prisma.admin.findUnique({ where: { id: token.sub } });
      if (!admin) return token;

      token.isSuperAdmin = admin.isSuperAdmin;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
