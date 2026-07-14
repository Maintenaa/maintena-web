import { ApiResponse, PaginatedApiResponse } from "@/modules/shared/dto/api_response";
import { api } from "@/network/api";
import { WorkOrderType } from "../dto/work-order-type";
import { CreateWorkOrderTypeRequest } from "../dto/create-work-order-type";
import { UpdateWorkOrderTypeRequest } from "../dto/update-work-order-type";
import { DeleteWorkOrderTypeRequest } from "../dto/delete-work-order-type";
import { GetWorkOrderTypesRequest } from "../dto/get-work-order-types";

export class WorkOrderTypeRepository {
  async getWorkOrderTypes(
    req: GetWorkOrderTypesRequest,
  ): Promise<PaginatedApiResponse<WorkOrderType[]>> {
    const { data } = await api.client.get(
      `/companies/${req.companyId}/work-order-types`,
    );
    return data;
  }

  async createWorkOrderType(
    req: CreateWorkOrderTypeRequest,
  ): Promise<ApiResponse<WorkOrderType>> {
    const { data } = await api.client.post(
      `/companies/${req.companyId}/work-order-types`,
      { name: req.name, description: req.description },
    );
    return data;
  }

  async updateWorkOrderType(
    req: UpdateWorkOrderTypeRequest,
  ): Promise<ApiResponse<WorkOrderType>> {
    const { data } = await api.client.put(
      `/companies/${req.companyId}/work-order-types/${req.workOrderTypeId}`,
      { name: req.name, description: req.description },
    );
    return data;
  }

  async deleteWorkOrderType(req: DeleteWorkOrderTypeRequest) {
    const { data } = await api.client.delete(
      `/companies/${req.companyId}/work-order-types/${req.workOrderTypeId}`,
    );
    return data;
  }
}
