import { adminGetCourses, AdminCourse } from "@/app/data/admin/admin-get-courses";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import AdminCoursesCard from "./_component/adminCoursesCard";

export default async function Courses() {
  const courses: AdminCourse[] = await adminGetCourses();
console.log(courses)
  return (
    <div className="space-y-6">
      {/* Header and Create button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>
        <Link className={buttonVariants({})} href="/admin/course/create">
          Create Course
        </Link>
      </div>


      {/* Courses Grid */}
      {courses && courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {courses.map((course) => (
    <AdminCoursesCard key={course.id} course={course} />
  ))}
</div>
      ) : (
        <p className="text-muted-foreground">No courses found.</p>
      )}
    </div>
  );
}
