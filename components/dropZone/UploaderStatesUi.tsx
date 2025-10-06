"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, RotateCcw, UploadCloud, X, XCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";

/**
 * Normal (idle) uploader state
 */



export function NormalState({ isDragActive }: {isDragActive: boolean;}) {
  return (
    <>
      <UploadCloud className="h-10 w-10 text-muted-foreground" />
      {isDragActive ? (
        <p className="text-sm font-medium text-primary">Drop files here…</p>
      ) : (
        <>
          <p className="text-sm font-medium text-muted-foreground">
            Drag & drop files here, or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Supports images and videos only
          </p>
        </>
      )}
    </>
  );
}


/**
 * Uploading state
 */
export function UploadingState({ progress, onCancel }: {
  progress?: number; // 0-100
  onCancel?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {/* Spinner */}
      <Loader2 className="h-8 w-8 animate-spin text-primary" />

      {/* Status text */}
      <p className="text-sm font-medium text-primary">
        Uploading{progress !== undefined ? `… ${progress}%` : "…"}
      </p>

      {/* Optional progress bar */}
      {progress !== undefined && (
        <div className="w-40 rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Optional cancel button */}
      {onCancel && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-1"
          onClick={(e) => {
            e.stopPropagation(); // 🚫 stops dropzone click
            onCancel();
    }}
        >
          Cancel
        </Button>
      )}
    </div>
  );
}

/**
 * Uploaded state (success)
 */




export function UploadedState({ file, onRemove, onRetry }:  {
  file: File | undefined
  onRemove?: () => void
  onRetry?: () => void
}) {
  if(!file){
    return
  }
  const isImage = file.type.startsWith("image/")
  const isVideo = file.type.startsWith("video/")

  const previewUrl = URL.createObjectURL(file)

  return (
    <Card className="relative flex p-1 h-64 w-full items-center justify-center overflow-hidden rounded-xl border">
      <CardContent className="flex h-full w-full items-center justify-center p-0">
        {isImage && (
          <img
            src={previewUrl}
            alt={file.name}
            className="h-full w-full object-cover"
          />
        )}
        {isVideo && (
          <video
            src={previewUrl}
            controls
            className="h-full w-full object-cover"
          />
        )}
        {!isImage && !isVideo && (
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
            <p className="text-sm font-medium">File uploaded</p>
          </div>
        )}
      </CardContent>

      {/* Overlay actions */}
      <div className="absolute top-2 right-2 flex gap-2">
        {onRetry && (
          <Button
            size="icon"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation()
              onRetry()
            }}
            className="rounded-full bg-background/80 backdrop-blur"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}
        {onRemove && (
          <Button
          type="button"
            size="icon"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className="rounded-full bg-background/80 backdrop-blur"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  )
}


/**
 * Failed state
 */
export function FailedState({ error }: { error?: string }) {
  toast.error(error ?? "Upload failed");

  return (
    <div className="flex flex-col items-center justify-center gap-2 text-red-600">
      <XCircle className="h-10 w-10" />
      <p className="text-sm font-medium">
        {error ?? "Something went wrong during upload"}
      </p>
      <Button
        variant="destructive"
        size="sm"
        className="mt-2"
        onClick={() => toast("Retry started")}
      >
        Retry
      </Button>
    </div>
  );
}
