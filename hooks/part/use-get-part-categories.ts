import { PartCategory } from "@/modules/part/dto/part-category";
import { useCompany } from "@/components/provider/company-provider";
import { PaginatedApiResponse } from "@/modules/shared/dto/api_response";
import { api } from "@/network/api";
import { useQuery } from "@tanstack/react-query";

export function useGetPartCategories() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;

  const query = useQuery({
    queryKey: ["part-categories", companyId],
    queryFn: async () => {
      const { data } = await api.client.get<
        PaginatedApiResponse<PartCategory[]>
      >(`/companies/${companyId}/part-categories`);
      return data;
    },
    enabled: !!companyId,
  });

  return { query };
}
