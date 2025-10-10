// app/course/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, FileText } from "lucide-react";
import { env } from "@/lib/env";

interface CoursePageProps {
  params: { slug: string };
}

export default async function CoursePage({ params }: CoursePageProps) {
    
  
  // Next 15+ passes params as Promise in server components
  const { slug } = await params;
  console.log(slug)

  const course = await prisma.course.findUnique({
    where: { slug },
    
  });

  if (!course) return notFound();
const imageUrl = `https://${env.NEXT_PUBLIC_AWS_BUCKET_NAME}.t3.storage.dev/${course.fileKey}`;
    console.log(imageUrl)
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Hero */}
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        <Image
          src={imageUrl}
          alt={course.title}
          width={1600}
          height={600}
          className="object-cover w-full h-96 brightness-90"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-start p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
          <p className="text-lg max-w-xl mb-4">{course.smallDescription}</p>
          <div className="flex items-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Enroll Now - ₹{course.price}
            </Button>
            <Badge variant="secondary">{course.level}</Badge>
          </div>
        </div>
      </div>

      {/* Course Info */}
      <Card className="shadow-xl border border-gray-200">
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-600" />
            <span>Duration: {course.duration} hours</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>Status: {course.status}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
            <span>Category: {course.category}</span>
          </div>
        </CardContent>
        <CardFooter>
          <span className="text-sm text-gray-500">Course slug: {course.slug}</span>
        </CardFooter>
      </Card>

      {/* Description */}
      <Card className="shadow-xl border border-gray-200">
        <CardHeader>
          <CardTitle>Full Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{course.description}</p>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center py-12">
        <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4">
          Enroll Now
        </Button>
      </div>
    </div>
  );
}
