"use server";

import { NextResponse } from "next/server";
import { s3 } from "@/lib/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { z } from "zod";
import { requireAdmin } from "@/app/data/admin/require-admin";

const deleteSchema = z.object({
  key: z.string().min(1),
});

export async function DELETE(req: Request) {
  await requireAdmin()
  const body = await req.json();
  const parsed = deleteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    await s3.send(new DeleteObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: parsed.data.key,
    }));
    console.log("phdeteetettete")
    return NextResponse.json({ success: true });
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { success: false, error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
