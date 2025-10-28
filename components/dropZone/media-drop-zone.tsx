"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";
import { NormalState, UploadedState, UploadingState } from "./UploaderStatesUi";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { env } from "@/lib/env";

export interface ManagedFile {
  id: string;
  file?: File;
  url?: string;
  uploading: boolean;
  progress: number;
  error: boolean;
  isDeleting: boolean;
  key?: string;
}

export default function MediaDropZone({
  value,
  onChange,
}: {
  value?: string; // from form field
  onChange?: (value: string) => void; // updates form field
}) {
  const [status, setStatus] = useState<
    "normal" | "uploading" | "uploaded" | "failed"
  >("normal");
  console.log("value");
  console.log(value);
  const [uploadedFile, setUploadedFile] = useState<ManagedFile | null>(null);

  // 🧠 Load existing value from form (useful when editing an existing course)
  const imageUrl = `https://${"abhi-lms-demo"}.t3.storage.dev/${value}`;

  useEffect(() => {
    if (value && !uploadedFile) {
      setUploadedFile({
        id: uuidv4(),
        uploading: false,
        progress: 100,
        error: false,
        isDeleting: false,
        key: value,
        url: imageUrl,
      });
      setStatus("uploaded");
    }
  }, [value]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const objectUrl = URL.createObjectURL(file);

    const newFile: ManagedFile = {
      id: uuidv4(),
      file,
      url: objectUrl,
      uploading: true,
      progress: 0,
      error: false,
      isDeleting: false,
    };

    setUploadedFile(newFile);
    setStatus("uploading");

    try {
      // 1️⃣ Get presigned URL
      const res = await fetch("/api/s3/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          size: file.size,
        }),
      });

      if (!res.ok) throw new Error("Failed to get presigned URL");

      const { url: preSignedUrl, key } = await res.json();

      // 2️⃣ Upload with progress tracking
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", preSignedUrl, true);
        xhr.setRequestHeader("Content-Type", file.type);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setUploadedFile((prev) => (prev ? { ...prev, progress } : prev));
          }
        };

        xhr.onload = () =>
          xhr.status >= 200 && xhr.status < 300
            ? resolve()
            : reject(new Error(`Upload failed with ${xhr.status}`));

        xhr.onerror = () => reject(new Error("Network error"));
        xhr.send(file);
      });

      // ✅ Upload success
      setUploadedFile((prev) =>
        prev ? { ...prev, uploading: false, progress: 100, key } : prev
      );
      setStatus("uploaded");

      // 🔥 Update form field
      onChange?.(key);

      toast.success("Upload successful!", {
        description: `${file.name} uploaded successfully.`,
      });
    } catch (err: any) {
      console.error("Upload failed:", err);
      setUploadedFile((prev) =>
        prev ? { ...prev, uploading: false, error: true } : prev
      );
      setStatus("failed");
      toast.error("Upload failed", {
        description: err?.message ?? "Unknown error occurred.",
      });
    }
  }, []);

  // 🧹 Cleanup
  useEffect(() => {
    return () => {
      if (uploadedFile?.url) URL.revokeObjectURL(uploadedFile.url);
    };
  }, [uploadedFile]);

  // 🗑️ Delete handler
  const handleRemoveFile = async () => {
    if (!uploadedFile) return;

    try {
      if (uploadedFile.key) {
        const res = await fetch("/api/s3/delete", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: uploadedFile.key }),
        });

        if (!res.ok) throw new Error("Failed to delete file on server");
        toast.success("Media deleted");
      }
    } catch (err: any) {
      toast.error("Could not delete file", { description: err.message });
      console.error(err);
    }

    if (uploadedFile.url) URL.revokeObjectURL(uploadedFile.url);
    setUploadedFile(null);
    setStatus("normal");
    onChange?.(""); // clear form field
  };

  // 🧲 Dropzone setup
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [], "video/*": [] },
    multiple: false,
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    onDropRejected: (rejections) => {
      rejections.forEach((rej) => {
        rej.errors.forEach((err) => {
          if (err.code === "file-invalid-type") {
            toast.error("Unsupported file type");
          } else if (err.code === "file-too-large") {
            toast.error("File too large (max 5MB)");
          }
        });
      });
    },
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative flex h-64 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed text-center transition-colors duration-200 ease-in-out",
        isDragActive
          ? "border-primary bg-primary/10"
          : "border-border hover:border-primary/60"
      )}
    >
      <CardContent className="flex flex-col items-center justify-center gap-3 p-1">
        <input {...getInputProps()} />

        {status === "normal" && <NormalState isDragActive={isDragActive} />}

        {status === "uploading" && uploadedFile && (
          <UploadingState
            progress={uploadedFile.progress}
            onCancel={handleRemoveFile}
          />
        )}

        {status === "uploaded" && uploadedFile && (
          <UploadedState file={uploadedFile.file} onRemove={handleRemoveFile} />
        )}

        {status === "failed" && (
          <>
            <XCircle className="h-10 w-10 text-red-600" />
            <p className="text-sm font-medium text-red-600">
              Upload failed. Try again.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
