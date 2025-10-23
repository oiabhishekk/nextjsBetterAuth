"use server";
import "server-only";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/app/data/admin/require-admin";

// ----- Function -----
export async function adminGetCourses() {
  await requireAdmin();

  try {
    const data = await prisma.course.findMany({
      orderBy: {
        createdAt: "desc",
      },
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
    return data;
  } catch (error) {
    console.error("Error fetching admin courses:", error);
  }
  return [];
}
// Full return type (array of courses)
export type AdminGetCoursesReturn = Awaited<ReturnType<typeof adminGetCourses>>;

// Type of a single course dynamically
export type AdminCourse = AdminGetCoursesReturn[number];
