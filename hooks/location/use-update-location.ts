import { useCompany } from "@/components/provider/company-provider";
import { api } from "@/network/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateLocation() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-location", companyId],
    mutationFn: async (params: { id: string; name: string }) => {
      const { id, ...body } = params;
      const { data } = await api.client.put(
        `/companies/${companyId}/locations/${id}`,
        body,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations", companyId] });
    },
  });

  return { mutation };
}
