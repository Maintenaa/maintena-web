import { AuthContext } from "@/modules/auth/context/auth-context";
import { User } from "@/modules/user/dto/user";
import { useState } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null | undefined>(null);

  return (
    <AuthContext.Provider value={{ user, setUser: (user) => setUser(user) }}>
      {children}
    </AuthContext.Provider>
  );
}
