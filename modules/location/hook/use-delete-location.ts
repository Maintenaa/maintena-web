import { useCompany } from "@/modules/company/context/company-context";
import { api } from "@/network/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteLocation() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-location", companyId],
    mutationFn: async (id: string) => {
      const { data } = await api.client.delete(
        `/companies/${companyId}/locations/${id}`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations", companyId] });
    },
  });

  return { mutation };
}
