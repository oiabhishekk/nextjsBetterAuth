"use server";
import "server-only";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

// ----- Function -----
export async function adminGetSingleCourse(id: string) {
  // Ensure only admin can access
  await requireAdmin();

  try {
    const data = await prisma.course.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        smallDescription: true,
        category: true,
        duration: true,
        level: true,
        status: true,
        price: true,
        fileKey: true,
        slug: true,
      },
    });

    if (!data) {
      // If course not found, show Next.js 404 page
      notFound();
    }

    return data;
  } catch (error) {
    console.error("Error fetching admin course:", error);
    // On error also fallback to 404
    notFound();
  }
}
export type AdminGetSingleCourseTypes = Awaited<
  ReturnType<typeof adminGetSingleCourse>
>;
