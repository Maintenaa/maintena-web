import { useCompany } from "@/components/provider/company-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { locationRepository } from "../../modules/location/location-module";

export function useDeleteLocation() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-location", companyId],
    mutationFn: async (id: string) => {
      if (!companyId) throw new Error("companyId is required");
      return locationRepository.deleteLocation({ companyId, id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations", companyId] });
    },
  });

  return { mutation };
}
