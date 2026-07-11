import { AssetCategory } from "@/modules/asset/dto/asset-category";
import { PaginatedApiResponse } from "@/modules/shared/dto/api_response";
import { api } from "@/network/api";
import { useQuery } from "@tanstack/react-query";

interface Props {
  companyId?: string;
  enabled?: boolean;
}

export function useGetAssetCategories({ companyId, enabled }: Props) {
  const query = useQuery({
    queryKey: ["asset-categories", companyId],
    queryFn: async () => {
      const { data } = await api.client.get<
        PaginatedApiResponse<AssetCategory[]>
      >(`/companies/${companyId}/asset-categories`);
      return data;
    },
    enabled,
  });

  return { query };
}
