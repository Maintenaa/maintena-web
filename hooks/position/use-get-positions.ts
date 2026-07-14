import { useCompany } from "@/components/provider/company-provider";
import { useQuery } from "@tanstack/react-query";
import { positionRepository } from "../../modules/position/position-module";

export function useGetPositions() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;

  const query = useQuery({
    queryKey: ["positions", companyId],
    queryFn: async () => {
      if (!companyId) throw new Error("companyId is required");
      const { data, pagination } = await positionRepository.getPositions({ companyId });
      return { data, pagination };
    },
    enabled: !!companyId,
  });

  return { query };
}
