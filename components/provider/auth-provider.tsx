"use client";

import { useGetProfile } from "@/hooks/auth/use-get-profile";
import { User } from "@/modules/user/dto/user";
import { Loader2Icon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

interface Props {
  children: React.ReactNode;
}

const authRouteRegex = /^\/(login|register|forgot-password)*/gi;

interface AuthContext {
  user?: User | null;
  setUser: (user: User | undefined | null) => void;
}

export const AuthContext = createContext({} as AuthContext);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null | undefined>(null);

  const path = usePathname();
  const router = useRouter();

  const {
    query: { data, isLoading },
  } = useGetProfile();

  function handleAuthRedirect() {
    if (isLoading) return;

    setUser(data);

    const isBaseRoute = path === "/";
    const isAuthRoute = authRouteRegex.test(path);

    if ((isBaseRoute || !isAuthRoute) && !data?.id) {
      router.replace("/login");
    }

    if ((isBaseRoute || isAuthRoute) && data?.id) {
      if (data?.role == "admin") router.replace("/admin");
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleAuthRedirect();
  }, [data, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background top-0 left-0 right-0 bottom-0 z-5">
        <Loader2Icon className="size-5 animate-spin" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser: (user) => setUser(user) }}>
      {children}
    </AuthContext.Provider>
  );
}
