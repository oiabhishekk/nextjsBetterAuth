"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
        },
      },
    });
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-background border-b">
      {/* Left */}
      <div
        className="text-xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        MyApp
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {session ? (
          <>
            <span className="text-sm text-muted-foreground">
              {session.user.name}
            </span>
            <Button onClick={signOut} size="sm" variant="destructive">
              Logout
            </Button>
          </>
        ) : (
          <Button onClick={() => router.push("/login")} size="sm">
            Login
          </Button>
        )}
      </div>
    </nav>
  );
}
