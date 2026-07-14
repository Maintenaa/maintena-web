import { useCompany } from "@/components/provider/company-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { positionRepository } from "../../modules/position/position-module";

export function useDeletePosition() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (positionId: string) => {
      if (!companyId) throw new Error("companyId is required");
      return positionRepository.deletePosition({ companyId, positionId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions", companyId] });
    },
  });

  return { mutation };
}
