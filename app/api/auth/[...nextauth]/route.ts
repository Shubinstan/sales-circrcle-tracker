// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth"; // Adjust relative path to your auth.ts file, or use "@/auth" if alias is configured

export const { GET, POST } = handlers;