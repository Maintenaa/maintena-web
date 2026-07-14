"use client";

import { cn, getErrorMessage } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import FormControl from "../form/form-control";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useLogin } from "@/hooks/auth/use-login";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [showPassword, setShowPassword] = useState(false);
  const {
    mutation: login,
    form: { handleSubmit, control },
  } = useLogin();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login.mutateAsync(data, {
        onSuccess() {
          queryClient.invalidateQueries({ queryKey: ["get-profile"] });
          queryClient.invalidateQueries({ queryKey: ["companies"] });
        },
      });
      router.replace("/");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  });

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={onSubmit}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <FormControl
            label="Email"
            labelHtmlFor="email"
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                id="email"
                autoComplete="off"
                placeholder="m@example.com"
                className="bg-background"
                type="email"
                {...field}
              />
            )}
          />
          <FormControl
            label="Password"
            labelHtmlFor="password"
            control={control}
            name="password"
            render={({ field }) => (
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="bg-background pr-10"
                  {...field}
                />
                <div className="flex items-center justify-center top-0 bottom-0 right-0 w-10 absolute">
                  <Button
                    size="icon-sm"
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    type="button"
                  >
                    {showPassword ? (
                      <EyeIcon className="size-4" />
                    ) : (
                      <EyeOffIcon className="size-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}
          />
          <div className="flex justify-end">
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Field>
            <Button type="submit">Login</Button>
          </Field>
          <div className="mt-1 text-center text-sm text-muted-foreground">
            Don{"'"}t have an account yet?{" "}
            <Link href="/register" className="text-primary underline">
              Register here
            </Link>
          </div>
        </div>
      </FieldGroup>
    </form>
  );
}
