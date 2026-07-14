import {
  ApiResponse,
  PaginatedApiResponse,
} from "@/modules/shared/dto/api_response";
import { api } from "@/network/api";
import { CreatePartSupplierRequest } from "../dto/create-part-supplier";
import { DeletePartSupplierRequest } from "../dto/delete-part-supplier";
import { GetPartSuppliersRequest } from "../dto/get-part-suppliers";
import { PartSupplier } from "../dto/part-supplier";
import { UpdatePartSupplierRequest } from "../dto/update-part-supplier";

export class PartSupplierRepository {
  async getPartSuppliers(
    req: GetPartSuppliersRequest,
  ): Promise<PaginatedApiResponse<PartSupplier[]>> {
    const { data } = await api.client.get(
      `/companies/${req.companyId}/part-suppliers`,
    );
    return data;
  }

  async getPartSupplierById(req: {
    companyId: string;
    id: string;
  }): Promise<ApiResponse<PartSupplier>> {
    const { data } = await api.client.get(
      `/companies/${req.companyId}/part-suppliers/${req.id}`,
    );
    return data;
  }

  async createPartSupplier(
    req: CreatePartSupplierRequest,
  ): Promise<ApiResponse<PartSupplier>> {
    const { data } = await api.client.post(
      `/companies/${req.companyId}/part-suppliers`,
      {
        name: req.name,
        phone: req.phone,
        email: req.email,
        address: req.address,
      },
    );
    return data;
  }

  async updatePartSupplier(
    req: UpdatePartSupplierRequest,
  ): Promise<ApiResponse<PartSupplier>> {
    const { data } = await api.client.put(
      `/companies/${req.companyId}/part-suppliers/${req.id}`,
      {
        name: req.name,
        phone: req.phone,
        email: req.email,
        address: req.address,
      },
    );
    return data;
  }

  async deletePartSupplier(req: DeletePartSupplierRequest) {
    const { data } = await api.client.delete(
      `/companies/${req.companyId}/part-suppliers/${req.id}`,
    );
    return data;
  }
}
