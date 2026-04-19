// actions/auth.ts
"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

/**
 * Handles secure user registration.
 * Implements the Result Object Pattern to gracefully return validation
 * and database errors to the client without triggering Next.js Error Boundaries.
 */
export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 1. Basic Validation Rules
  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  // 2. Password Complexity System Design
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long." };
  }
  
  // Optional: Require at least one number
  if (!/\d/.test(password)) {
    return { error: "Password must contain at least one number." };
  }

  try {
    // 3. Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Returning an object instead of throwing an error
      return { error: "An account with this email already exists." };
    }

    // 4. Secure Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Database Insertion
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Success response
    return { success: true };

  } catch (error) {
    // Catch-all for unexpected database failures (e.g., DB connection lost)
    console.error("Registration error:", error);
    return { error: "Internal server error. Please try again later." };
  }
}