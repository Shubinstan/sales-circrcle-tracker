// app/register/page.tsx
"use client";

import { useState } from "react";
import { registerUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

/**
 * RegisterPage Component (Client Component)
 * Provides the UI for new user registration.
 * Delegates the actual database mutation to a Server Action to ensure secure execution environment.
 */
export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles form submission by invoking the registerUser Server Action.
   * Catches and displays server-side validation errors in the client UI.
   */
  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Execute the Server Action securely. Database logic remains hidden from the client.
      await registerUser(formData);
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your email below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Using Next.js 14 action attribute to seamlessly connect Client forms to Server Actions */}
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="m@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}