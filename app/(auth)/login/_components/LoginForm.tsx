"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GithubIcon, Loader, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
export function LoginForm() {
  const [isPendingGithub, startTransitionGithub] = useTransition();
  const [isPendingOtp, startTransitionOtp] = useTransition();
  const [email, setEmail] = useState("");
  const router = useRouter();

  async function signInWithGithub() {
    startTransitionGithub(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged in successfully, You'll be redirected"); // redirect to login page
          },
          onError: (e) => {
            toast.error("Internal server Error");
          },
        },
      });
    });
  }
  function signInWithEmailOTP() {
    startTransitionOtp(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email, // required
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success(`Otp send on ${email}`);
            router.push(`/verify-email?email=${email}`);
          },
          onError: (err) => {
            toast.error(`Please check email`);
            console.log(err.error);
          },
        },
      });
    });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome Back!</CardTitle>
        <CardDescription>Login with your Github Email Account</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-center gap-6">
        <Button
          disabled={isPendingGithub}
          onClick={signInWithGithub}
          className="w-full"
          variant="outline"
        >
          {isPendingGithub ? (
            <>
              <Loader className="size-4 animate-spin" />{" "}
              <span>Signing in with github</span>
            </>
          ) : (
            <>
              <GithubIcon className="size-4" />
              Sign in with Github
            </>
          )}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <div className="grid gap-3">
          <div className=" grid gap-2">
            <Label htmlFor="email" className="">
              Email
            </Label>
            <Input
              placeholder="xyz@example.com"
              type="email"
              name="email"
              id="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <Button disabled={isPendingOtp} onClick={signInWithEmailOTP}>
            {isPendingOtp ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Sending OTP...</span>
              </>
            ) : (
              <>Continue with Email</>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
