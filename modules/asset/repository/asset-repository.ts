import { ApiResponse, PaginatedApiResponse } from "@/modules/shared/dto/api_response";
import { api } from "@/network/api";
import { Asset } from "../dto/asset";
import { AssetCategory } from "../dto/asset-category";
import { CreateAssetCategoryRequest } from "../dto/create-asset-category";
import { CreateAssetRequest } from "../dto/create-asset";
import { DeleteAssetCategoryRequest } from "../dto/delete-asset-category";
import { GetAssetCategoriesRequest } from "../dto/get-asset-categories";
import { GetAssetByIdRequest } from "../dto/get-asset-by-id";
import { GetAssetsRequest } from "../dto/get-assets";
import { UpdateAssetCategoryRequest } from "../dto/update-asset-category";
import { UpdateAssetRequest } from "../dto/update-asset";

export class AssetRepository {
  async getAssets(req: GetAssetsRequest): Promise<PaginatedApiResponse<Asset[]>> {
    const { data } = await api.client.get(`/companies/${req.companyId}/assets`);
    return data;
  }

  async getAssetById(req: GetAssetByIdRequest): Promise<ApiResponse<Asset>> {
    const { data } = await api.client.get(
      `/companies/${req.companyId}/assets/${req.assetId}`,
    );
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

  async createAsset(req: CreateAssetRequest): Promise<ApiResponse<Asset>> {
    const { data } = await api.client.post(
      `/companies/${req.companyId}/assets`,
      {
        code: req.code,
        name: req.name,
        description: req.description,
        categoryId: req.categoryId,
        locationId: req.locationId,
        status: req.status,
        lastMaintenanceAt: req.lastMaintenanceAt,
        installationDate: req.installationDate,
        expirationDate: req.expirationDate,
        manufacturer: req.manufacturer,
        model: req.model,
        specifications: req.specifications,
        photo: req.photo,
      },
    );
    return data;
  }

  async updateAsset(req: UpdateAssetRequest): Promise<ApiResponse<Asset>> {
    const { data } = await api.client.put(
      `/companies/${req.companyId}/assets/${req.assetId}`,
      {
        code: req.code,
        name: req.name,
        description: req.description,
        categoryId: req.categoryId,
        locationId: req.locationId,
        status: req.status,
        lastMaintenanceAt: req.lastMaintenanceAt,
        installationDate: req.installationDate,
        expirationDate: req.expirationDate,
        manufacturer: req.manufacturer,
        model: req.model,
        specifications: req.specifications,
        photo: req.photo,
      },
    );
    return data;
  }
}
