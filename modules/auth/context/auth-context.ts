import { User } from "@/modules/user/dto/user";
import { createContext, useContext } from "react";

interface AuthContext {
  user?: User | null;
  setUser: (user: User | undefined | null) => void;
}

export const AuthContext = createContext({} as AuthContext);

export function useAuth() {
  return useContext(AuthContext);
}
