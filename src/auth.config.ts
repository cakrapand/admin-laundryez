import type { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./lib/schema";
import prisma from "@/lib/db";
import { compare } from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { username, password } = validatedFields.data;

          const admin = await prisma.admin.findUnique({
            where: { username: username },
          });
          if (!admin) return null;

          const passwordMatch = await compare(password, admin.password);
          if (passwordMatch) return admin as any;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
