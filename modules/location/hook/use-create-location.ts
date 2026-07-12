import { useCompany } from "@/modules/company/context/company-context";
import { api } from "@/network/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateLocation() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-location", companyId],
    mutationFn: async (params: { name: string }) => {
      const { data } = await api.client.post(
        `/companies/${companyId}/locations`,
        params,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations", companyId] });
    },
  });

  return { mutation };
}
