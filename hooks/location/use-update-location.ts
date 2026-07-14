import { useCompany } from "@/components/provider/company-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { locationRepository } from "../../modules/location/location-module";

export function useUpdateLocation() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-location", companyId],
    mutationFn: async (params: { id: string; name: string }) => {
      if (!companyId) throw new Error("companyId is required");
      return locationRepository.updateLocation({
        companyId,
        id: params.id,
        name: params.name,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations", companyId] });
    },
  });

  return { mutation };
}
