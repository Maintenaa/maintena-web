"use client";

import { ThemeToggler } from "@/components/theme-toggler";
import { GalleryVerticalEndIcon } from "lucide-react";
import Link from "next/link";

export function AuthContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh bg-background">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-between">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEndIcon className="size-4" />
            </div>
            Acme Inc.
          </Link>
          <ThemeToggler />
        </div>
        <div className="flex flex-1 items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
