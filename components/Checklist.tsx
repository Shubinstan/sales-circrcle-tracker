// components/Checklist.tsx
"use client";

import { useState, useTransition } from "react";
import { CHECKLIST_CATEGORIES } from "@/lib/constants";
import { toggleTask } from "@/actions/tasks";
import { Checkbox } from "@/components/ui/checkbox";

interface ChecklistProps {
  initialCompletedTasks: string[];
}

export default function Checklist({ initialCompletedTasks }: ChecklistProps) {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(
    new Set(initialCompletedTasks)
  );
  const [isPending, startTransition] = useTransition();

  // Calculate Progress
  const totalTasks = CHECKLIST_CATEGORIES.reduce((acc, cat) => acc + cat.tasks.length, 0);
  const progressPercentage = Math.round((completedTasks.size / totalTasks) * 100) || 0;

  const handleToggle = (taskId: string, isCompleted: boolean) => {
    const newCompleted = new Set(completedTasks);
    if (isCompleted) newCompleted.add(taskId);
    else newCompleted.delete(taskId);
    
    setCompletedTasks(newCompleted);

    startTransition(() => {
      toggleTask(taskId, isCompleted);
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
      
      {/* Progress Header */}
      <div className="p-6 border-b border-zinc-100 bg-zinc-50/50">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 mb-2">My Checklist</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-2 bg-zinc-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-zinc-900 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-sm font-medium text-zinc-500 w-12 text-right">
            {progressPercentage}%
          </span>
        </div>
      </div>

      {/* Categories */}
      <div className="p-6 space-y-8">
        {CHECKLIST_CATEGORIES.map((category) => (
          <div key={category.id} className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
              {category.title}
            </h3>
            <div className="space-y-3">
              {category.tasks.map((task) => {
                const isChecked = completedTasks.has(task.id);
                return (
                  <div 
                    key={task.id} 
                    className="flex items-start space-x-3 group transition-opacity duration-200"
                  >
                    <Checkbox
                      id={task.id}
                      checked={isChecked}
                      onCheckedChange={(checked) => handleToggle(task.id, checked as boolean)}
                      disabled={isPending}
                      className="mt-0.5 border-zinc-300 data-[state=checked]:bg-zinc-900 data-[state=checked]:text-white"
                    />
                    <label
                      htmlFor={task.id}
                      className={`text-sm leading-tight cursor-pointer select-none transition-colors duration-200 ${
                        isChecked 
                          ? "text-zinc-400 line-through" 
                          : "text-zinc-700 group-hover:text-zinc-900"
                      }`}
                    >
                      {task.title}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}