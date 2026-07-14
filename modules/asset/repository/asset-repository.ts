import { ApiResponse, PaginatedApiResponse } from "@/modules/shared/dto/api_response";
import { api } from "@/network/api";
import { Asset } from "../dto/asset";
import { AssetCategory } from "../dto/asset-category";
import { CreateAssetCategoryRequest } from "../dto/create-asset-category";
import { DeleteAssetCategoryRequest } from "../dto/delete-asset-category";
import { GetAssetCategoriesRequest } from "../dto/get-asset-categories";
import { GetAssetsRequest } from "../dto/get-assets";
import { UpdateAssetCategoryRequest } from "../dto/update-asset-category";

export class AssetRepository {
  async getAssets(req: GetAssetsRequest): Promise<PaginatedApiResponse<Asset[]>> {
    const { data } = await api.client.get(`/companies/${req.companyId}/assets`);
    return data;
  }

  async getAssetCategories(
    req: GetAssetCategoriesRequest,
  ): Promise<PaginatedApiResponse<AssetCategory[]>> {
    const { data } = await api.client.get(
      `/companies/${req.companyId}/asset-categories`,
    );
    return data;
  }

  async createAssetCategory(
    req: CreateAssetCategoryRequest,
  ): Promise<ApiResponse<AssetCategory>> {
    const { data } = await api.client.post(
      `/companies/${req.companyId}/asset-categories`,
      { name: req.name },
    );
    return data;
  }

  async updateAssetCategory(
    req: UpdateAssetCategoryRequest,
  ): Promise<ApiResponse<AssetCategory>> {
    const { data } = await api.client.put(
      `/companies/${req.companyId}/asset-categories/${req.categoryId}`,
      { name: req.name },
    );
    return data;
  }

  async deleteAssetCategory(req: DeleteAssetCategoryRequest) {
    const { data } = await api.client.delete(
      `/companies/${req.companyId}/asset-categories/${req.categoryId}`,
    );
    return data;
  }
}
