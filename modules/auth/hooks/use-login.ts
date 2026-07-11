import { useMutation } from "@tanstack/react-query";
import { authRepository } from "../auth-module";
import { LoginParams } from "../dto/login";
import { api } from "@/network/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export function useLogin() {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: z.email({ error: "Invalid email address" }),
        password: z
          .string({ error: "Password is required" })
          .min(1, { error: "Password is required" }),
      }),
    ),
    defaultValues: { email: "", password: "" },
  });

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (params: LoginParams) => {
      const { data } = await authRepository.login(params);

      api.setToken(data.accessToken);

      return data;
    },
  });

  return { mutation, form };
}
