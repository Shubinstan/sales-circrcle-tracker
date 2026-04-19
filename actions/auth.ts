// actions/auth.ts
"use server";

import { prisma } from "@/lib/prisma"; // Adjust path if needed
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user in the database
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // Redirect to login page after successful registration
  redirect("/login");
}