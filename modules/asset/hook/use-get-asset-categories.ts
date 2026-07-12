import { AssetCategory } from "@/modules/asset/dto/asset-category";
import { useCompany } from "@/modules/company/context/company-context";
import { PaginatedApiResponse } from "@/modules/shared/dto/api_response";
import { api } from "@/network/api";
import { useQuery } from "@tanstack/react-query";

export function useGetAssetCategories() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;

  const query = useQuery({
    queryKey: ["asset-categories", companyId],
    queryFn: async () => {
      const { data } = await api.client.get<
        PaginatedApiResponse<AssetCategory[]>
      >(`/companies/${companyId}/asset-categories`);
      return data;
    },
    enabled: !!companyId,
  });

  return { query };
}
