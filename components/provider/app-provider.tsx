import { Toaster } from "../ui/sonner";
import QueryProvider from "./query-provider";
import AuthProvider from "./auth-provider";
import { TooltipProvider } from "../ui/tooltip";
import { ThemeProvider } from "next-themes";

interface Props {
  children: React.ReactNode;
}

export default function AppProvider({ children }: Props) {
  return (
    <ThemeProvider attribute="class">
      <QueryProvider>
        <AuthProvider>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
