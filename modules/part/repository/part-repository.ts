import { ApiResponse, PaginatedApiResponse } from "@/modules/shared/dto/api_response";
import { api } from "@/network/api";
import { CreatePartCategoryRequest } from "../dto/create-part-category";
import { DeletePartCategoryRequest } from "../dto/delete-part-category";
import { GetPartCategoriesRequest } from "../dto/get-part-categories";
import { GetPartsRequest } from "../dto/get-parts";
import { Part } from "../dto/part";
import { PartCategory } from "../dto/part-category";
import { UpdatePartCategoryRequest } from "../dto/update-part-category";

export class PartRepository {
  async getParts(req: GetPartsRequest): Promise<PaginatedApiResponse<Part[]>> {
    const { data } = await api.client.get(`/companies/${req.companyId}/parts`);
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
