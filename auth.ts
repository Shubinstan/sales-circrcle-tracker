// auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "./lib/prisma";

/**
 * NextAuth (v5) Core Configuration
 * Implements secure credential-based authentication using stateless JSON Web Tokens (JWT).
 * This strategy is optimal for edge deployments and scales efficiently without DB session lookups.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Guard clause: Ensure both fields are provided
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Retrieve user from PostgreSQL via Prisma
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) {
          return null;
        }

        // Security: Use bcrypt to compare the incoming password string against the hashed DB record
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        // Return the subset of user data allowed to be embedded in the JWT
        return {
          id: user.id,
          email: user.email,
        };
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    /**
     * JWT Callback: Invoked when a token is created or updated.
     * We explicitly attach the DB user ID and email to the token payload.
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email; 
      }
      return token;
    },
    /**
     * Session Callback: Invoked whenever the session is checked on the client or server.
     * Maps the secure JWT token properties to the active session object.
     */
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    }
  }
});