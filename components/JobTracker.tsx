// components/JobTracker.tsx
"use client";

import { useState, useTransition } from "react";
import { addJob, deleteJob } from "@/actions/jobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

type Job = {
  id: string;
  date: Date;
  company: string;
  role: string;
  stage: string;
  outcome: string | null;
  notes: string | null;
};

interface JobTrackerProps {
  initialJobs: Job[];
}

/**
 * JobTracker Component
 * A full CRUD interface for managing job applications.
 * Implements React 18 concurrent features (useTransition) to keep the UI responsive
 * during asynchronous server mutations.
 */
export default function JobTracker({ initialJobs }: JobTrackerProps) {
  // Manages the state of the Add Job modal dialog
  const [isOpen, setIsOpen] = useState(false);
  
  // useTransition prevents the UI from freezing while waiting for server responses
  const [isPending, startTransition] = useTransition();

  /**
   * Wraps the addJob Server Action in a transition.
   * Closes the dialog automatically upon successful creation.
   */
  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await addJob(formData);
        setIsOpen(false);
      } catch (error) {
        alert("Failed to add job. Please check your inputs.");
      }
    });
  };

  /**
   * Prompts the user for confirmation before executing the deletion Server Action.
   */
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      startTransition(async () => {
        await deleteJob(id);
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden flex flex-col w-full">
      
      {/* Header Section */}
      <div className="p-6 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-50/50">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Job Tracker</h2>
          <p className="text-sm text-zinc-500 mt-1">Keep track of your applications</p>
        </div>
        
        {/* Radix UI primitive-based Dialog for accessible modal interactions */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-lg shadow-sm">
              <span className="text-lg mr-1 leading-none mb-0.5">+</span> Add Job
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Job Application</DialogTitle>
            </DialogHeader>
            <form action={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" placeholder="Acme Corp" maxLength={100} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" name="role" placeholder="Frontend Dev" maxLength={100} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stage">Stage</Label>
                  <Input id="stage" name="stage" placeholder="First Interview" maxLength={100} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="outcome">Outcome (Optional)</Label>
                <Input id="outcome" name="outcome" placeholder="e.g. Pending, Offer, Rejected" maxLength={50} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Input id="notes" name="notes" placeholder="Any additional notes..." maxLength={500} />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Saving..." : "Save Job Application"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table Section - Wrapped in overflow-x-auto for horizontal scrolling on mobile devices */}
      <div className="overflow-x-auto">
        <Table className="min-w-[600px]">
          <TableHeader>
            <TableRow className="border-zinc-100 hover:bg-transparent">
              <TableHead className="w-24 text-zinc-500 font-medium">Date</TableHead>
              <TableHead className="text-zinc-500 font-medium">Company</TableHead>
              <TableHead className="text-zinc-500 font-medium">Role</TableHead>
              <TableHead className="text-zinc-500 font-medium">Stage</TableHead>
              <TableHead className="text-zinc-500 font-medium">Outcome</TableHead>
              <TableHead className="text-zinc-500 font-medium">Notes</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialJobs.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={7} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center text-zinc-400 space-y-2">
                    <p>No applications tracked yet.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              initialJobs.map((job) => (
                <TableRow key={job.id} className="group border-zinc-100 transition-colors hover:bg-zinc-50/80">
                  {/* suppressHydrationWarning ensures the server's generic date format safely syncs with the client's locale */}
                  <TableCell className="whitespace-nowrap text-zinc-500 text-sm" suppressHydrationWarning>
                    {new Date(job.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-semibold text-zinc-900">{job.company}</TableCell>
                  <TableCell className="text-zinc-700 text-sm">{job.role}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
                      {job.stage}
                    </span>
                  </TableCell>
                  <TableCell className="text-zinc-600 text-sm">{job.outcome || "-"}</TableCell>
                  <TableCell className="max-w-50 truncate text-zinc-500 text-sm" title={job.notes || ""}>
                    {job.notes || "-"}
                  </TableCell>
                  <TableCell>
                    {/* Delete button fades in on row hover to maintain a clean UI */}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(job.id)}
                      disabled={isPending}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-red-600 hover:bg-red-50 h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}