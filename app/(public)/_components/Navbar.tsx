"use client";
import Logo from "@/public/globe.svg";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./../../../components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import { UserDropDown } from "./UserDropDown";
const navigationItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Products",
    href: "/products",
  },
  {
    name: "Orders",
    href: "/orders",
  },
  {
    name: "Analytics",
    href: "/analytics",
  },
];

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  console.log(session);
  return (
    <header className="w-full sticky top-0 z-50 border-b bg-background/90 backdrop-blur-[backdrop-filter]:bg-background/60  ">
      <div className=" p-4 container flex min-h-16 items-center mx-auto px-4 md:px-6 lg:px-8">
        <Link className="flex items-center space-x-2 mr-4" href={"/"}>
          <Image className="size-9" src={Logo} alt="Logo" />
          <span className="font-bold">
            ABHI <span className="text-primary">LMS.</span>{" "}
          </span>
        </Link>
        {/* desktop nav */}
        <nav className="hidden md:flex md:flex-1 items-center justify-between">
          <ul className=" flex items-center space-x-4">
            {navigationItems.map((item) => {
              return (
                <Link
                  className="text-sm font-medium transition-colors hover:text-primary"
                  href={item.href}
                  key={item.name}
                >
                  {item.name}
                </Link>
              );
            })}
          </ul>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isPending ? null : session ? (
              // origin ui
              <UserDropDown userData={session.user} />
            ) : (
              <>
                <Link
                  className={buttonVariants({
                    variant: "secondary",
                  })}
                  href={"/login"}
                >
                  Login{" "}
                </Link>
                <Link className={buttonVariants()} href={"/login"}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
