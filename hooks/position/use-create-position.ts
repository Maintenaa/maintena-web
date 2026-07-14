import { useCompany } from "@/components/provider/company-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { positionRepository } from "../../modules/position/position-module";
import { CreatePositionRequest } from "../../modules/position/dto/create-position";

export function useCreatePosition() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-position", companyId],
    mutationFn: async (params: Omit<CreatePositionRequest, "companyId">) => {
      if (!companyId) throw new Error("companyId is required");
      return positionRepository.createPosition({ ...params, companyId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions", companyId] });
    },
  });

  return { mutation };
}
