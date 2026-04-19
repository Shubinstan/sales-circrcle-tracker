// actions/jobs.ts
"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function addJob(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Extract form data
  const company = formData.get("company") as string;
  const role = formData.get("role") as string;
  const stage = formData.get("stage") as string;
  const outcome = formData.get("outcome") as string;
  const notes = formData.get("notes") as string;
  const dateString = formData.get("date") as string;

  // 1. Backend Validation: Prevent absurdly long strings
  if (company?.length > 100) throw new Error("Company name is too long (max 100 chars)");
  if (role?.length > 100) throw new Error("Role is too long (max 100 chars)");
  if (stage?.length > 100) throw new Error("Stage is too long (max 100 chars)");
  if (outcome?.length > 50) throw new Error("Outcome is too long (max 50 chars)");
  if (notes?.length > 500) throw new Error("Notes are too long (max 500 chars)");

  await prisma.jobApplication.create({
    data: {
      userId,
      date: new Date(dateString),
      company,
      role,
      stage,
      outcome: outcome || null,
      notes: notes || null,
    },
  });

  revalidatePath("/");
}

export async function deleteJob(jobId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await prisma.jobApplication.delete({
    where: {
      id: jobId,
      userId: userId, 
    },
  });

  revalidatePath("/");
}