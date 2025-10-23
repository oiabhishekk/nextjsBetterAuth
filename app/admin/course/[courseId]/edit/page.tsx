// app/admin/course/[id]/edit/page.tsx
// import CourseTabs from "./CourseTabs"; // client component
import { adminGetSingleCourse } from "@/app/data/admin/admin-get-course";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notFound } from "next/navigation";
import EditCourseForm from "./_components/editCourse";

type PageProps = Promise<{ courseId: string }>;

export default async function EditCoursePage({
  params,
}: {
  params: PageProps;
}) {
  const { courseId } = await params;
  const course = await adminGetSingleCourse(courseId);
  console.log(course);
  if (!course) {
    notFound();
  }

  return (
    <div className=" ">
      <h1 className="text-2xl font-bold mb-4">Edit Course: {course.title}</h1>
      {/* <CourseTabs course={course} /> */}
      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="course-structure">Course Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
              <CardDescription>Edit the Course.</CardDescription>
            </CardHeader>
            <CardContent>
              <EditCourseForm data={course} />
              {/* Add form fields or content for basic info here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="course-structure">
          <Card>
            <CardHeader>
              <CardTitle>Course Structure</CardTitle>
              <CardDescription>
                {/* Add a brief description or instructions here */}
              </CardDescription>
            </CardHeader>
            {/* Add course structure details or components here */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
