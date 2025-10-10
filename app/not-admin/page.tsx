"use client";

import { Home, ShieldX } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotAdminPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted p-4">
      <Card className="max-w-md w-full shadow-lg rounded-2xl border">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl md:text-3xl font-bold text-red-600">
            🚫 Access Denied
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm md:text-base">
            Oops! You do not have permission to access this page because you are not an admin.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 pt-4">
          {/* Optional illustration */}
          <div className="w-32 h-32 md:w-40 md:h-40 bg-red-100 rounded-full flex items-center justify-center">
            <ShieldX className="w-12 h-12 text-red-500" />
          </div>

          {/* Go Home button */}
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <Home className="w-4 h-4" /> Go to Homepage
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
