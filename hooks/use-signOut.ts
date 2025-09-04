"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
  export default function useSignOut(){
    const router = useRouter();
    
    async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Signed Out Successfully");
        },
      },
    });
  }
  return handleLogout;
  }