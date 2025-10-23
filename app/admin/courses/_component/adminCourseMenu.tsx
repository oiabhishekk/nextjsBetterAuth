"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Eye, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTransition } from "react";

interface AdminCourseMenuProps {
  courseId: string;
  courseSlug: string;
}

export function AdminCourseMenu({
  courseId,
  courseSlug,
}: AdminCourseMenuProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      // you can later implement delete logic here using server action
      console.log("Deleting course:", isPending, courseId);
    });
  };

  return (
    <div className="absolute z-10 top-2 right-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="text-white bg-black/30 hover:bg-black/40"
          >
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem asChild>
            <Link
              href={`/admin/course/${courseId}/edit`}
              className="flex items-center gap-2"
            >
              <Pencil className="h-4 w-4" /> Edit Course
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href={`/course/${courseSlug}`}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" /> Preview
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            onClick={handleDelete}
          >
            <Trash className="h-4 w-4" /> Delete Course
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
