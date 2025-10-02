"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";
import { NormalState, UploadedState, UploadingState } from "./UploaderStatesUi";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export interface ManagedFile {
  id: string;
  file?: File;
  url?: string;
  uploading: boolean;
  progress: number;
  error: boolean;
  isDeleting: boolean;
}

export default function MediaDropZone() {
  const [status, setStatus] = useState<
    "normal" | "uploading" | "uploaded" | "failed"
  >("normal");

  const [uploadedFile, setUploadedFile] = useState<ManagedFile | null>(null);

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
      // Simulate upload progress
      for (let p = 0; p <= 100; p += 25) {
        await new Promise((res) => setTimeout(res, 400));
        setUploadedFile((prev) =>
          prev ? { ...prev, progress: p } : prev
        );
      }

      setUploadedFile((prev) =>
        prev ? { ...prev, uploading: false, progress: 100 } : prev
      );
      setStatus("uploaded");
    } catch (err) {
      setUploadedFile((prev) =>
        prev ? { ...prev, uploading: false, error: true } : prev
      );
      setStatus("failed");
    }
  }, []);

  // cleanup object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (uploadedFile?.url) URL.revokeObjectURL(uploadedFile.url);
    };
  }, [uploadedFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [], "video/*": [] },
    multiple: false,
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDropRejected: (rejections) => {
      rejections.forEach((rej) => {
        rej.errors.forEach((err) => {
          if (err.code === "file-invalid-type") {
            toast.error("Unsupported file type", {
              description: "Only images and videos are allowed.",
              duration: 4000,
            });
          } else if (err.code === "file-too-large") {
            toast.error("File too large", {
              description: "The file exceeds the 5MB limit.",
              duration: 4000,
            });
          } else {
            toast.error("Upload failed", { description: err.code });
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
      <CardContent className="flex flex-col items-center justify-center gap-3 p-6">
        <input {...getInputProps()} />

        {status === "normal" && <NormalState isDragActive={isDragActive} />}

        {status === "uploading" && uploadedFile && (
          <UploadingState
            progress={uploadedFile.progress}
            onCancel={() => {
              setStatus("normal");
              setUploadedFile(null);
            }}
          />
        )}

        {status === "uploaded" && uploadedFile && (
          <>
            <CheckCircle2 className="h-10 w-10 text-green-600" />
            <p className="text-sm font-medium text-green-600">
              {uploadedFile.file?.name} uploaded successfully!
            </p>
            <UploadedState file={uploadedFile.file} />
          </>
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
