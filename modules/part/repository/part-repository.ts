import { ApiResponse, PaginatedApiResponse } from "@/modules/shared/dto/api_response";
import { api } from "@/network/api";
import { CreatePartCategoryRequest } from "../dto/create-part-category";
import { CreatePartRequest } from "../dto/create-part";
import { DeletePartCategoryRequest } from "../dto/delete-part-category";
import { DeletePartRequest } from "../dto/delete-part";
import { GetPartByIdRequest } from "../dto/get-part-by-id";
import { GetPartCategoriesRequest } from "../dto/get-part-categories";
import { GetPartsRequest } from "../dto/get-parts";
import { Part } from "../dto/part";
import { PartCategory } from "../dto/part-category";
import { UpdatePartCategoryRequest } from "../dto/update-part-category";
import { UpdatePartRequest } from "../dto/update-part";

export class PartRepository {
  async getParts(req: GetPartsRequest): Promise<PaginatedApiResponse<Part[]>> {
    const { data } = await api.client.get(`/companies/${req.companyId}/parts`);
    return data;
  }

  async getPartById(req: GetPartByIdRequest): Promise<ApiResponse<Part>> {
    const { data } = await api.client.get(
      `/companies/${req.companyId}/parts/${req.partId}`,
    );
    return data;
  }

  async createPart(req: CreatePartRequest): Promise<ApiResponse<Part>> {
    const { data } = await api.client.post(
      `/companies/${req.companyId}/parts`,
      {
        code: req.code,
        name: req.name,
        description: req.description,
        categoryId: req.categoryId,
        locationId: req.locationId,
        supplierId: req.supplierId,
        quantity: req.quantity,
        unit: req.unit,
        cost: req.cost,
        expirationDate: req.expirationDate,
        photo: req.photo,
      },
    );
    return data;
  }

  async updatePart(req: UpdatePartRequest): Promise<ApiResponse<Part>> {
    const { data } = await api.client.put(
      `/companies/${req.companyId}/parts/${req.partId}`,
      {
        code: req.code,
        name: req.name,
        description: req.description,
        categoryId: req.categoryId,
        locationId: req.locationId,
        supplierId: req.supplierId,
        quantity: req.quantity,
        unit: req.unit,
        cost: req.cost,
        expirationDate: req.expirationDate,
        photo: req.photo,
      },
    );
    return data;
  }

  async deletePart(req: DeletePartRequest) {
    const { data } = await api.client.delete(
      `/companies/${req.companyId}/parts/${req.partId}`,
    );
    return data;
  }

  async getPartCategories(
    req: GetPartCategoriesRequest,
  ): Promise<PaginatedApiResponse<PartCategory[]>> {
    const { data } = await api.client.get(
      `/companies/${req.companyId}/part-categories`,
    );
    return data;
  }

  async createPartCategory(
    req: CreatePartCategoryRequest,
  ): Promise<ApiResponse<PartCategory>> {
    const { data } = await api.client.post(
      `/companies/${req.companyId}/part-categories`,
      { name: req.name },
    );
    return data;
  }

  async updatePartCategory(
    req: UpdatePartCategoryRequest,
  ): Promise<ApiResponse<PartCategory>> {
    const { data } = await api.client.put(
      `/companies/${req.companyId}/part-categories/${req.categoryId}`,
      { name: req.name },
    );
    return data;
  }

  async deletePartCategory(req: DeletePartCategoryRequest) {
    const { data } = await api.client.delete(
      `/companies/${req.companyId}/part-categories/${req.categoryId}`,
    );
    return data;
  }
}
