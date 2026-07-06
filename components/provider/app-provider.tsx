"use client";

import { useGetProfile } from "@/modules/auth/hooks/use-get-profile";
import { Toaster } from "../ui/sonner";
import QueryProvider from "./query-provider";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AuthProvider from "./auth-provider";
import { useAuth } from "@/modules/auth/context/auth-context";
import { TooltipProvider } from "../ui/tooltip";

interface Props {
  children: React.ReactNode;
}

const authRouteRegex = /^\/(login|register|forgot-password)*/gi;

function AppProviderContent({ children }: Props) {
  const path = usePathname();
  const router = useRouter();
  const { setUser } = useAuth();

  const {
    query: { data, isLoading },
  } = useGetProfile();

  useEffect(() => {
    if (isLoading) return;

    setUser(data);

    const isBaseRoute = path === "/";
    const isAuthRoute = authRouteRegex.test(path);

    if ((isBaseRoute || isAuthRoute) && data?.id) {
      router.replace("/panel");
    }

    if ((isBaseRoute || !isAuthRoute) && !data?.id) {
      router.replace("/login");
    }
  }, [data, isLoading]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-background top-0 left-0 right-0 bottom-0">
        <Loader2Icon className="size-5 animate-spin" />
      </div>
    );

  return children;
}

export default function AppProvider({ children }: Props) {
  return (
    <QueryProvider>
      <AuthProvider>
        <TooltipProvider>
          <AppProviderContent>{children}</AppProviderContent>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
