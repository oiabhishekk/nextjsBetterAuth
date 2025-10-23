export type ActionResponse<T = undefined> =
  | {
    status: "success";
    message: string;
    data: T;
  }
  | {
    status: "error";
    message: string;
    errors?: Record<string, string[]>;
  };
//enums
export const STATIC_ENUMS = {
  Level: ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const,
  Status: ["DRAFT", "PUBLIC", "ARCHIVE"] as const,
  Category: [
    "BUSINESS",
    "DEVELOPMENT",
    "DESIGN",
    "MARKETING",
    "FINANCE_ACCOUNTING",
    "IT_SOFTWARE",
    "PERSONAL_DEVELOPMENT",
    "PHOTOGRAPHY_VIDEO",
    "MUSIC",
    "HEALTH_FITNESS",
    "LIFESTYLE",
    "TEACHING_ACADEMICS",
    "SCIENCE",
    "ENGINEERING",
    "DATA_SCIENCE",
    "AI",
    "CYBERSECURITY",
    "LANGUAGE_LEARNING",
    "ARTS_HUMANITIES",
    "WRITING_CONTENT",
    "OTHERS",
  ] as const,
};