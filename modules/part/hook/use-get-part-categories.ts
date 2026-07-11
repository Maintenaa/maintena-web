import { PartCategory } from "@/modules/part/dto/part-category";
import { PaginatedApiResponse } from "@/modules/shared/dto/api_response";
import { api } from "@/network/api";
import { useQuery } from "@tanstack/react-query";

interface Props {
  companyId?: string;
  enabled?: boolean;
}

export function useGetPartCategories({ companyId, enabled }: Props) {
  const query = useQuery({
    queryKey: ["part-categories", companyId],
    queryFn: async () => {
      const { data } = await api.client.get<
        PaginatedApiResponse<PartCategory[]>
      >(`/companies/${companyId}/part-categories`);
      return data;
    },
    enabled,
  });

  return { query };
}
