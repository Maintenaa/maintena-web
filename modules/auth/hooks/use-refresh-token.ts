import { useMutation } from "@tanstack/react-query";
import { authRepository } from "../auth-module";
import { api } from "@/network/api";

export function useRefreshToken() {
  const mutation = useMutation({
    mutationKey: ["refresh-token"],
    mutationFn: async () => {
      const { data } = await authRepository.refreshToken();
      api.setToken(data.accessToken);
      return data;
    },
    retry: false,
  });

  return { mutation };
}
