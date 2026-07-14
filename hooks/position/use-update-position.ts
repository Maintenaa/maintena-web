import { useCompany } from "@/components/provider/company-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { positionRepository } from "../../modules/position/position-module";
import { UpdatePositionRequest } from "../../modules/position/dto/update-position";

export function useUpdatePosition() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-position", companyId],
    mutationFn: async (
      params: Omit<UpdatePositionRequest, "companyId">,
    ) => {
      if (!companyId) throw new Error("companyId is required");
      return positionRepository.updatePosition({ ...params, companyId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions", companyId] });
    },
  });

  return { mutation };
}
