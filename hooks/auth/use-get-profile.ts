import { useQuery } from "@tanstack/react-query";
import { authRepository } from "../../modules/auth/auth-module";

export function useGetProfile() {
  const query = useQuery({
    queryKey: ["get-profile"],
    queryFn: async () => {
      const { data } = await authRepository.getProfile();
      return data;
    },
    retry: false,
  });

  return { query };
}
