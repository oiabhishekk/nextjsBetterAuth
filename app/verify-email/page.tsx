"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [isPending, startTransition] = useTransition();

  if (!email) {
    // If email is missing, redirect to login
    router.push("/login");
    return null;
  }

  async function verifyOtp() {
   if (!email) {
    // If email is missing, redirect to login
    router.push("/login");
    return null;
  }
    startTransition(async () => {
      try {
        const { error } = await authClient.signIn.emailOtp({
          email,
          otp,
        });
        if (error) {
          toast.error("Invalid OTP. Please try again.");
        } else {
          toast.success("OTP verified successfully!");
          router.push("/"); // Redirect to dashboard or homepage
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Verify Your Email</CardTitle>
          <CardDescription className="text-center">
            Enter the 6-digit code sent to{" "}
            <span className="font-medium">{email}</span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex justify-center mb-6">
            <InputOTP
              value={otp}
              onChange={setOtp}
              pattern={REGEXP_ONLY_DIGITS}
              maxLength={6}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={verifyOtp}
            disabled={isPending || otp.length !== 6}
            className="w-full"
          >
            {isPending ? "Verifying..." : "Verify OTP"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
