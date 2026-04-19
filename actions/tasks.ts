// actions/tasks.ts
"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function toggleTask(taskId: string, isCompleted: boolean) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Update or insert (upsert) the task progress for the current user
  await prisma.taskProgress.upsert({
    where: {
      userId_taskId: {
        userId,
        taskId,
      },
    },
    update: {
      isCompleted,
    },
    create: {
      userId,
      taskId,
      isCompleted,
    },
  });

  // Revalidate the home page so the UI updates with fresh DB data
  revalidatePath("/");
}