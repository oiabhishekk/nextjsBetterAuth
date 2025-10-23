import { z } from "zod";

// Enums
import { Category,Status,Level } from './generated/prisma/index.d';

// for server
// Optional: export as Zod enums
import { STATIC_ENUMS } from "./types";

export const LevelEnum = z.enum(STATIC_ENUMS.Level);
export const StatusEnum = z.enum(STATIC_ENUMS.Status);
export const CourseCategoriesEnum = z.enum(STATIC_ENUMS.Category);
//for types 
export type CourseCategoriesEnumType = z.infer<typeof CourseCategoriesEnum>;
export type StatusEnumType = z.infer<typeof StatusEnum>;
export type LevelEnumType = z.infer<typeof LevelEnum>;
//for options write 3 more exports
export const LevelOptions = LevelEnum.options; // ["BEGINNER", "INTERMEDIATE", "ADVANCED"]
export const StatusOptions = StatusEnum.options; // ["DRAFT", "PUBLIC", "ARCHIVE"]
export const CourseCategoryOptions = CourseCategoriesEnum.options; 


export const courseFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  smallDescription: z
    .string()
    .max(160, "Small description must be under 160 characters"),
  fileKey: z.string().min(1, "File key is required"),
  price: z.number().nonnegative("Price must be >= 0"),
  duration: z.number().positive("Duration must be > 0"),
  slug: z
  .string()
  .min(3, "Category slug is required")
  .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and dashes"),
  
  
  // ✅ Now always required
  category: CourseCategoriesEnum,
  level: LevelEnum,
  status: StatusEnum,
});

// Type
export type CourseFormSchemaType = z.infer<typeof courseFormSchema>;
