// app/page.tsx
import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Checklist from "@/components/Checklist";
import JobTracker from "@/components/JobTracker";
import { LogOut } from "lucide-react";

export default async function Home() {
  const session = await auth();

  if (!session?.user?.id) return null;

  const userProgress = await prisma.taskProgress.findMany({
    where: { userId: session.user.id, isCompleted: true },
    select: { taskId: true }
  });
  const completedTaskIds = userProgress.map((p) => p.taskId);

  const jobs = await prisma.jobApplication.findMany({
    where: { userId: session.user.id },
    orderBy: { date: 'desc' }
  });

  return (
    <div className="min-h-screen bg-zinc-50/50 text-zinc-900 selection:bg-zinc-200">
      
      {/* Sleek Sticky Header with Glassmorphism */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto max-w-7xl px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">PT</span>
            </div>
            <h1 className="text-lg font-semibold tracking-tight text-zinc-900">Progress Tracker</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-zinc-500 hidden md:inline-block">
              {session.user.email}
            </span>
            <form action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}>
              <Button type="submit" variant="ghost" size="sm" className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100">
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Checklist */}
          <div className="lg:col-span-5">
            <Checklist initialCompletedTasks={completedTaskIds} />
          </div>

          {/* Right Column: Job Tracker Table */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <JobTracker initialJobs={jobs} />
          </div>
          
        </div>
      </main>
    </div>
  );
}