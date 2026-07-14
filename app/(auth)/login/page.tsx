import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <LoginForm />
    </div>
  );
}
