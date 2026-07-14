import { AssetCategory } from "@/modules/asset/dto/asset-category";
import { useCompany } from "@/components/provider/company-provider";
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
