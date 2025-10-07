"use client";
import slugify from "slugify";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  courseFormSchema,
  CourseFormSchemaType,
  StatusEnum,
  CourseCategoriesEnum,
  LevelEnum,
} from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ArrowLeft, Loader2, PlusIcon, Sparkle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/rich-text-editor/Editor";
import MediaDropZone from "@/components/dropZone/media-drop-zone";
import { useTransition } from "react";
import { CreateCourse } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CourseCreate() {
  const [isloaded,startTransition]=useTransition()
  const router = useRouter()
  const form = useForm<CourseFormSchemaType>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: "",
      description: "",
      smallDescription: "",
      fileKey: "",
      price: 0,
      duration: 1,
      category: "Others",
      slug: "",
      level: "BEGINNER",
      status: "DRAFT",
    },
  });

  function onSubmit(values: CourseFormSchemaType) {
  startTransition(async () => {
    const res = await CreateCourse(values);

    if (!res) return;

    if (res.status === "success") {
      router.push("/admin/courses")
      form.reset()
      toast.success(res.message || "Course created successfully!");

      console.log("Created Course:", res.data);
    } else {
      toast.error(res.message || "Error creating course");
      console.error("CreateCourse Error:", res.errors || res.message);
    }
  });
}

  return (
    <>
      <div className="flex justify-between mb-4 gap-4 items-center">
        <Link
          href="/admin/courses"
          className={buttonVariants({
            variant: "outline",
            size: "icon",
          })}
        >
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="text-2xl font-bold">Create Couses</h1>
      </div>

      <Card>
        <CardHeader>
          Basic Information
          <CardDescription>
            Provide Basic Informations about the course.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormDescription>
                      Give your course a clear and catchy name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Slug */}
              <div className="flex flex-col sm:flex-row  sm:gap-4 w-full">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Course Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="your_course_slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  onClick={() => {
                    const titleValue = form.getValues("title");
                    form.setValue("slug", slugify(titleValue, "-"));
                  }}
                  className="sm:mt-6 w-full sm:w-auto"
                >
                  Generate slug <Sparkle size={16} />
                </Button>
              </div>
              {/* Small Description */}
              <FormField
                control={form.control}
                name="smallDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Small Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-48"
                        placeholder="Short tagline"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A tagline or one-liner for your course.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Description</FormLabel>
                    <FormControl>
                      {/* <Textarea
                        className="min-h-48"
                        placeholder="Briefly describe your course"
                        {...field}
                      /> */}
                      <RichTextEditor field={field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* File Key */}
              <FormField
                control={form.control}
                name="fileKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Media</FormLabel>
                    <FormControl>
                      {/* <Input placeholder="thumbnail url" {...field} /> */}
                      <MediaDropZone
          value={field.value}
          onChange={(value) => field.onChange(value)} // 👈 important
        />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CourseCategoriesEnum.options.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Pick the main category for this course.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Level */}
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select course level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {LevelEnum.options.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Pick the skill level for this course.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Price */}

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          type="number"
                          placeholder="1000"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Price in INR or your default currency.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Duration */}
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          type="number"
                          placeholder="60"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        How long the course lasts in minutes.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {StatusEnum.options.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="" disabled={isloaded}>
               { isloaded? <>Creating... <Loader2 size={16} className="ml-1 animate-spin" /> </>:<> Create Course <PlusIcon size={16} className="ml-1" />
                </>}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
