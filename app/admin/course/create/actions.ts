"use server";

import { prisma } from "@/lib/prisma";
import { courseFormSchema, CourseFormSchemaType } from "@/lib/zod-schema";
import type { ActionResponse } from "@/lib/types"; // we’ll define this below
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function CreateCourse(
  values: CourseFormSchemaType
): Promise<ActionResponse<{ id: string }>> {
  // 1️⃣ Validate input using Zod
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const parsed = courseFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  if (!session?.user?.id) {
    return {
      status: "error",
      message: "User session not found or user is not authenticated.",
    };
  }
  
  try {
    // 2️⃣ Create record in DB
    const course = await prisma.course.create({
      data: {
        ...parsed.data,
        userId: session.user.id, // userId is now guaranteed to be a string
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
