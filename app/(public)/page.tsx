import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
interface featureProps {
  title: string;
  description: string;
  icon: string;
}
function FeatureCard({ title, description, icon }: featureProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="text-4xl mb-4"> {icon}</div>
        <CardTitle>{title}</CardTitle>
        <CardDescription> {description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
export default function Home() {
  const features: featureProps[] = [
    {
      title: "Fast Learning",
      description:
        "Access bite-sized lessons and speed up your learning journey anytime, anywhere.",
      icon: "⚡️",
    },
    {
      title: "Interactive Quizzes",
      description:
        "Test your knowledge with fun and engaging quizzes after every module.",
      icon: "📝",
    },
    {
      title: "Community Support",
      description:
        "Join a thriving community of learners and get help when you need it.",
      icon: "🤝",
    },
    {
      title: "Track Progress",
      description:
        "Visualize your growth with progress tracking and personalized milestones.",
      icon: "📊",
    },
    {
      title: "Certificate of Completion",
      description:
        "Earn verified certificates and showcase your achievements on LinkedIn.",
      icon: "🎓",
    },
  ];

  return (
    <>
      <section>
        <div className="flex py-10 flex-col space-y-8 justify-center items-center text-center">
          <Badge variant="outline" className="">
            The future of Online Education
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-[700]  tracking-tight">
            Elevate Your Learning Experience
          </h1>
          <p className="text-muted-foreground md:text-lg max-w-[700px] px-4 text-center">
            Learn smarter, not harder — our LMS gives you interactive lessons,
            real projects, and skills that prepare you for tomorrow’s world.
          </p>
          <div className="flex gap-2">
            <Link
              href="/cources"
              className={buttonVariants({
                size: "lg",
              })}
            >
              Explore Courses
            </Link>

            {/* <Link
              href="/login"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Login
            </Link> */}
          </div>
        </div>
      </section>
      <section className="mb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </section>
    </>
  );
}
