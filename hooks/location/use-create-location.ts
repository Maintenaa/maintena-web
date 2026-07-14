import { useCompany } from "@/components/provider/company-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { locationRepository } from "../../modules/location/location-module";

export function useCreateLocation() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-location", companyId],
    mutationFn: async (params: { name: string }) => {
      if (!companyId) throw new Error("companyId is required");
      return locationRepository.createLocation({ companyId, name: params.name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations", companyId] });
    },
  });

  return { mutation };
}
