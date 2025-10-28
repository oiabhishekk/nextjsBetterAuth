"use server";

import { prisma } from "@/lib/prisma";
import { courseFormSchema, CourseFormSchemaType } from "@/lib/zod-schema";
import type { ActionResponse } from "@/lib/types";
import { requireAdmin } from "@/app/data/admin/require-admin";

export async function UpdateCourse(
  values: CourseFormSchemaType & { id?: string }
): Promise<ActionResponse<{ id: string }>> {
  // 1️⃣ Require admin access
  const session = await requireAdmin();

  // 2️⃣ Validate input
  const parsed = courseFormSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // 3️⃣ Validate session
  if (!session?.user?.id) {
    return {
      status: "error",
      message: "User session not found or not authenticated.",
    };
  }

  // 4️⃣ Validate course ID
  if (!values.id) {
    return {
      status: "error",
      message: "Course ID is required for updating.",
    };
  }

  try {
    // 5️⃣ Update the existing course
    const updatedCourse = await prisma.course.update({
      where: { id: values.id },
      data: {
        ...parsed.data,
        updatedAt: new Date(),
      },
    });

    // 6️⃣ Return success
    return {
      status: "success",
      message: "Course updated successfully.",
      data: { id: updatedCourse.id },
    };
  } catch (error: any) {
    console.error("UpdateCourse error:", error);

    // Handle not found case
    if (error.code === "P2025") {
      return {
        status: "error",
        message: "Course not found.",
      };
    }

    return {
      status: "error",
      message: "An unexpected error occurred while updating the course.",
    };
  }
}
