import { Asset } from "@/modules/asset/dto/asset";
import { PaginatedApiResponse } from "@/modules/shared/dto/api_response";
import { useDebouncedState } from "@/hooks/use-debounced-state";
import { api } from "@/network/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  companyId?: string;
  enabled?: boolean;
}

export function useGetAssets({ companyId, enabled }: Props) {
  const query = useQuery({
    queryKey: ["assets", companyId],
    queryFn: async () => {
      const { data } = await api.client.get<PaginatedApiResponse<Asset[]>>(
        `/companies/${companyId}/assets`,
      );
      return data;
    },
    enabled,
  });

  return { query };
}

export function useGetAssetFilter() {
  const [search, setSearch] = useState<string>();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [debouncedSearch] = useDebouncedState(search);

  return {
    search,
    page,
    perPage,
    setSearch,
    setPage,
    setPerPage,
    debouncedSearch,
  };
}
