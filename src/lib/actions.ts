"use server";

import { redirect } from "next/navigation";
import { formLoginInput, LoginSchema } from "./schema";
import prisma from "./db";
import { compare } from "bcryptjs";
import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export async function login(data: formLoginInput) {
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) return { success: false, message: "Invalid or empty input" };

  const { username, password } = validatedFields.data;

  try {
    await signIn("credentials", { username, password, redirect: false });
    return { success: true, message: `Hi, welcome back ${username}` };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Incorrect username or password" };
        default:
          return { success: false, message: "Something went wrong" };
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
}
