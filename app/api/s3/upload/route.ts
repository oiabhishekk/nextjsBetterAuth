"use server";

import { NextResponse } from "next/server";
import { s3 } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "@/lib/env";
import { z } from "zod";

// Zod schema for upload request
const uploadSchema = z.object({
  fileName: z.string().min(1, "Filename is required").max(255, "Filename too long"),
  fileType: z
    .string()
    .regex(/^[a-zA-Z0-9]+\/[a-zA-Z0-9\-\.\+]+$/, "Invalid MIME type"),
  size: z
    .number()
    .positive("Size must be greater than 0")
    .max(5 * 1024 * 1024, "File too large (max 5MB)"), // ✅ adjust max size
});

export async function POST(req: Request) {
  const body = await req.json();

  // validate input safely
  const parsed = uploadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }
  try {


    const { fileName, fileType, size } = parsed.data;
    const key = `uploads/${Date.now()}-${fileName}`
    const command = new PutObjectCommand({
      Bucket: env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: key,
      ContentType: fileType,


    });

    const url = await getSignedUrl(s3, command, { expiresIn: 300 }); // 5 minutes

    return NextResponse.json({ success: true, url, key });
  }
  catch (error) {
    NextResponse.json({
      error: "Failed to Generate Presigned Url"
    }, {
      status: 500
    })

  }
}
