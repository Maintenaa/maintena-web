"use client";

import { LoginForm } from "@/components/login-form";
import { AuthContent } from "../(auth)/layout";

export default function LoginPage() {
  return (
    <AuthContent>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </AuthContent>
  );
}
