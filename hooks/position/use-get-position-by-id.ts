import { useCompany } from "@/components/provider/company-provider";
import { useQuery } from "@tanstack/react-query";
import { positionRepository } from "../../modules/position/position-module";

export function useGetPositionById(positionId: string | null) {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;

  const query = useQuery({
    queryKey: ["position", companyId, positionId],
    queryFn: async () => {
      if (!companyId) throw new Error("companyId is required");
      if (!positionId) throw new Error("positionId is required");
      const { data } = await positionRepository.getPositionById({
        companyId,
        positionId,
      });
      return data;
    },
    enabled: !!companyId && !!positionId,
  });

  return { query };
}
