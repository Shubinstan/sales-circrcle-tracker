// lib/constants.ts

export type Task = {
  id: string;
  title: string;
};

export type Category = {
  id: string;
  title: string;
  tasks: Task[];
};

export const CHECKLIST_CATEGORIES: Category[] = [
  {
    id: "week-1",
    title: "Week 1 Getting Started",
    tasks: [
      { id: "w1-1", title: "Attended onboarding call" },
      { id: "w1-2", title: "Joined the Circle community" },
      { id: "w1-3", title: "Introduced myself in the General channel" },
      { id: "w1-4", title: "Set up my SolidRoad account" },
      { id: "w1-5", title: "Set up my Whisper Flow account" },
      { id: "w1-6", title: "Accessed Interview Coach GPT" },
      { id: "w1-7", title: "Submitted my Week 1 check-in form" },
      { id: "w1-8", title: "Reviewed my programme schedule and key dates" },
    ]
  },
  {
    id: "week-1-2",
    title: "Week 1-2 My Foundations",
    tasks: [
      { id: "w12-1", title: "CV reviewed and updated" },
      { id: "w12-2", title: "LinkedIn profile reviewed and updated" },
      { id: "w12-3", title: "LinkedIn headline optimised for SDR/BDR/AE roles" },
      { id: "w12-4", title: "LinkedIn summary written in first person" },
      { id: "w12-5", title: "My target company list started (minimum 20 companies)" },
      { id: "w12-6", title: "My target role list defined (SDR / BDR / AE - which am I going for?)" },
    ]
  },
  {
    id: "week-2",
    title: "Week 2 - My Sales Skills",
    tasks: [
      { id: "w2-1", title: "Completed first SolidRoad mock call session" },
      { id: "w2-2", title: "Completed first Whisper Flow practice session" },
      { id: "w2-3", title: "Reviewed my call feedback and noted key areas to improve" },
      { id: "w2-4", title: "Practiced my \"tell me about yourself\" pitch" },
      { id: "w2-5", title: "Completed at least one peer practice session" },
    ]
  },
  {
    id: "week-2-3",
    title: "Week 2-3 My Job Search",
    tasks: [
      { id: "w23-1", title: "Started applying to roles (minimum 5 applications)" },
      { id: "w23-2", title: "Personalised each cover message / intro" },
      { id: "w23-3", title: "Connected with 10+ relevant people on LinkedIn" },
      { id: "w23-4", title: "Engaged with at least 3 posts in my target companies' feeds" },
      { id: "w23-5", title: "Posted or engaged on Linkedin at least once" },
    ]
  },
  {
    id: "ongoing",
    title: "Ongoing - Weekly Habits",
    tasks: [
      { id: "ong-1", title: "Submitted my weekly check-in form (every Thursday)" },
      { id: "ong-2", title: "Attended live session / group call" },
      { id: "ong-3", title: "Completed at least 2 mock call practice sessions" },
      { id: "ong-4", title: "Applied to a minimum of 3-5 roles" },
      { id: "ong-5", title: "Posted a win or update in the Wins channel (Fridays)" },
      { id: "ong-6", title: "Engaged with at least one peer in the community" },
    ]
  },
  {
    id: "month-1",
    title: "Month 1 Milestone - Interview Ready",
    tasks: [
      { id: "m1-1", title: "Had at least one recruiter / screening call" },
      { id: "m1-2", title: "Completed a Pre-Interview Prep Form before each interview" },
      { id: "m1-3", title: "Completed an Interview Debrief Form after each interview" },
      { id: "m1-4", title: "Shared interview experience with my CSM" },
      { id: "m1-5", title: "Identified my top 3 areas to improve from interviews so far" },
    ]
  },
  {
    id: "month-2",
    title: "Month 2 Milestone - Offer Stage",
    tasks: [
      { id: "m2-1", title: "Had a final-stage interview" },
      { id: "m2-2", title: "Received and reviewed an offer" },
      { id: "m2-3", title: "Connected with my CSM before accepting / negotiating" },
      { id: "m2-4", title: "Accepted a role" },
      { id: "m2-5", title: "Celebrated in the Wins channel" },
    ]
  }
];