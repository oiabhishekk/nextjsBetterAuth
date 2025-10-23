import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Clock, GraduationCap } from "lucide-react";
import Link from "next/link";
import type { AdminCourse } from "@/app/data/admin/admin-get-courses";
import { env } from "@/lib/env";

import { AdminCourseMenu } from "./adminCourseMenu";

interface AdminCoursesCardProps {
  course: AdminCourse;
}

export default function AdminCoursesCard({ course }: AdminCoursesCardProps) {
  const imageUrl = `https://${env.NEXT_PUBLIC_AWS_BUCKET_NAME}.t3.storage.dev/${course.fileKey}`;
  console.log(imageUrl);
  return (
    <Card className="overflow-hidden border w-full border-border py-0 bg-muted/20 hover:shadow-md transition-all">
      {/* Course Banner */}
      <div className="relative h-40 w-full">
        {/* Dropdown Menu Button */}

        <AdminCourseMenu courseId={course.id} courseSlug={course.slug} />
        <Image
          src={imageUrl}
          alt={course.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded">
          2024
        </div>
      </div>

      <CardContent className="p-4 space-y-2">
        <h2 className="text-lg font-semibold line-clamp-1">{course.title}</h2>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.smallDescription}
        </p>

        {/* Meta info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}h</span>
          </div>
          <div className="flex items-center gap-1">
            <GraduationCap className="w-4 h-4" />
            <span>{course.level}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/admin/course/${course.id}/edit`}>Edit Course →</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
