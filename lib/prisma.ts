// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

/**
 * Global Prisma Client instantiation.
 * Utilizes the Singleton pattern to prevent exhausting the PostgreSQL 
 * connection pool during Next.js Fast Refresh in development mode.
 * In production, a single instance is safely maintained.
 */
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  // Allow global `var` declarations
  // eslint-disable-next-line no-var
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;