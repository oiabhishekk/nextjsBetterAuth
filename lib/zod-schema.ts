import { z } from "zod";

// Enums
export const LevelEnum = z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]);
export const StatusEnum = z.enum(["DRAFT", "PUBLIC", "ARCHIVE"]);
export const CourseCategoriesEnum = z.enum([
  "Business",
  "Development",
  "Design",
  "Marketing",
  "Finance & Accounting",
  "IT & Software",
  "Personal Development",
  "Photography & Video",
  "Music",
  "Health & Fitness",
  "Lifestyle",
  "Teaching & Academics",
  "Science",
  "Engineering",
  "Data Science",
  "Artificial Intelligence",
  "Cybersecurity",
  "Language Learning",
  "Arts & Humanities",
  "Writing & Content Creation","Others"
] as const );


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
