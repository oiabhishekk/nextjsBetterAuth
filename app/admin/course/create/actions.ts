"use server";

import { prisma } from "@/lib/prisma";
import { courseFormSchema, CourseFormSchemaType } from "@/lib/zod-schema";
import type { ActionResponse } from "@/lib/types"; // we’ll define this below

export async function CreateCourse(
  values: CourseFormSchemaType
): Promise<ActionResponse<{ id: string }>> {
  // 1️⃣ Validate input using Zod
  const parsed = courseFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    // 2️⃣ Create record in DB
    const course = await prisma.course.create({
      data: {
        ...parsed.data,
        userId: "hh", // replace with actual user ID later
      },
    });

    // 3️⃣ Success response
    return {
      status: "success",
      message: "Course created successfully ",
      data: { id: course.id },
    };
  } catch (error) {
    console.error("CreateCourse error:", error);

    return {
      status: "error",
      message: "An unexpected error occurred while creating the course.",
    };
  }
}
