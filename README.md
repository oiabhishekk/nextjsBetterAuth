# LMS (Learning Management System)

A modern, full-featured Learning Management System built with **Next.js 15**, **Prisma**, **Tailwind CSS**, and **shadcn/ui**. This platform enables users to manage and access courses, supporting file uploads, rich text content, and analytics dashboards. Designed for scalability, performance, and visual appeal.

---

## 🚀 Features

- **Dynamic Course Management:** Add, edit, and view courses.
- **Rich Text Support:** Built with TipTap editor for course content.
- **File Uploads:** Integrates with AWS S3 for secure course files.
- **Interactive UI:** Modern interface using shadcn/ui and Radix primitives.
- **Analytics & Charts:** Recharts for course statistics.
- **Authentication & Authorization:** User management with Better Auth.
- **Responsive Design:** Mobile-first with Tailwind CSS.
- **Drag & Drop:** Sort course content using DnD Kit.
- **Email Notifications:** Transactional emails via Resend.
- **Dark Mode Support:** Integrated with next-themes.

---

## 🛠 Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS 4, shadcn/ui, Radix UI
- **Backend:** Node.js, Prisma ORM, PostgreSQL / MongoDB
- **Authentication:** Better Auth
- **File Storage:** AWS S3
- **Form Handling:** React Hook Form + Zod validation
- **Charts & Analytics:** Recharts
- **Icons:** Lucide React
- **Utilities:** clsx, tailwind-merge, slugify, uuid

---

## 📁 File Structure

```
├─ app/                   # Next.js pages and server components
├─ components/            # Reusable UI components
├─ hooks/                 # Custom React hooks
├─ lib/                   # Library functions, Prisma client, utilities
├─ prisma/                # Prisma schema & migrations
├─ public/                # Static assets
├─ .env                   # Environment variables
├─ package.json
├─ tsconfig.json
├─ next.config.ts
├─ postcss.config.js
├─ tailwind.config.js
└─ README.md
```

---

## ⚡ Installation & Setup

1. **Clone the repository**
  ```bash
  git clone https://github.com/oiabhishekk/lms.git
  cd lms
  ```

2. **Install dependencies**
  ```bash
  pnpm install
  ```

3. **Setup environment variables**

  Create a `.env` file in the root:

  ```env
  DATABASE_URL="your_database_url"
  AWS_ACCESS_KEY_ID="your_s3_access_key"
  AWS_SECRET_ACCESS_KEY="your_s3_secret"
  AWS_BUCKET_NAME="your_s3_bucket"
  NEXT_PUBLIC_RESEND_API_KEY="your_resend_key"
  ```

4. **Generate Prisma client**
  ```bash
  pnpm prisma generate
  ```

5. **Run development server**
  ```bash
  pnpm dev
  ```

6. Visit [http://localhost:3000](http://localhost:3000) to see the LMS in action.

---

## 🧩 Scripts

| Script        | Description                              |
| ------------- | ---------------------------------------- |
| `dev`         | Start development server                 |
| `build`       | Build production version                 |
| `start`       | Start production server                  |
| `lint`        | Run ESLint                               |
| `postinstall` | Generate Prisma client after install     |

---

## 💡 Notes

- Designed to be modular and scalable.
- Fully responsive and accessible.
- Integrates modern web best practices for UI/UX.
- Easy to extend with new features like quizzes, assignments, or dashboards.

---

## 🎯 Goal

This LMS project demonstrates full-stack expertise in modern web development, making it an ideal portfolio project for recruiters looking for **Next.js**, **React**, and **Prisma** experience.