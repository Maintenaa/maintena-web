import { useMutation } from "@tanstack/react-query";
import { authRepository } from "../auth_module";
import { LoginParams } from "../dto/login";
import { api } from "@/network/api";

export function useLogin() {
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (params: LoginParams) => {
      const result = await authRepository.login(params);

      api.setToken(result.data.accessToken);

      return result;
    },
  });

  return { mutation };
}
