# 🚀 Progress & Job Application Tracker

A full-stack web application designed to track onboarding progress, weekly tasks, and job applications. Built with a focus on a modern, minimalistic UI, secure authentication, and optimistic data fetching.

## ✨ Features

- **Secure Authentication:** Credential-based login system built with NextAuth.js (v5).
- **Interactive Checklist:** Optimistic UI updates for a snappy, zero-latency feel when toggling tasks.
- **Job Tracker (CRUD):** A dashboard to log and manage job applications, stages, and outcomes.
- **Progress Visualization:** Dynamic progress bar calculating completion rates in real-time.
- **Responsive Design:** Mobile-first approach using Tailwind CSS and Shadcn UI components.
- **Server Actions:** Secure, API-less database mutations using Next.js Server Actions.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL (hosted on [Neon](https://neon.tech/))
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [Auth.js v5](https://authjs.dev/)
- **Styling:** Tailwind CSS
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) & Lucide Icons

## ⚙️ Local Development

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/sales-circle-tracker.git](https://github.com/your-username/sales-circle-tracker.git)
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables by creating a `.env` file:
   ```env
   DATABASE_URL="your-postgresql-connection-string"
   AUTH_SECRET="your-random-secret-key"
   AUTH_URL="http://localhost:3000"
   AUTH_TRUST_HOST=true
   ```

4. Push the database schema:
   ```bash
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```