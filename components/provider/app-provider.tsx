import { Toaster } from "../ui/sonner";
import QueryProvider from "./query-provider";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      {children}
      <Toaster />
    </QueryProvider>
  );
}
