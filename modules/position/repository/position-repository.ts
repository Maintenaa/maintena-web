import { ApiResponse, PaginatedApiResponse } from "@/modules/shared/dto/api_response";
import { api } from "@/network/api";
import { CreatePositionRequest } from "../dto/create-position";
import { DeletePositionRequest } from "../dto/delete-position";
import { GetPositionByIdRequest } from "../dto/get-position-by-id";
import { GetPositionsRequest } from "../dto/get-positions";
import { Position } from "../dto/position";
import { UpdatePositionRequest } from "../dto/update-position";

export class PositionRepository {
  async getPositions(req: GetPositionsRequest): Promise<PaginatedApiResponse<Position[]>> {
    const { data } = await api.client.get(`/companies/${req.companyId}/positions`);
    return data;
  }

  async getPositionById(req: GetPositionByIdRequest): Promise<ApiResponse<Position>> {
    const { data } = await api.client.get(
      `/companies/${req.companyId}/positions/${req.positionId}`,
    );
    return data;
  }

  async createPosition(req: CreatePositionRequest): Promise<ApiResponse<Position>> {
    const { data } = await api.client.post(
      `/companies/${req.companyId}/positions`,
      {
        name: req.name,
        isAdmin: req.isAdmin,
        isTechnician: req.isTechnician,
        isOwner: req.isOwner,
      },
    );
    return data;
  }

  async updatePosition(req: UpdatePositionRequest): Promise<ApiResponse<Position>> {
    const { data } = await api.client.put(
      `/companies/${req.companyId}/positions/${req.positionId}`,
      {
        name: req.name,
        isAdmin: req.isAdmin,
        isTechnician: req.isTechnician,
        isOwner: req.isOwner,
      },
    );
    return data;
  }

  async deletePosition(req: DeletePositionRequest) {
    const { data } = await api.client.delete(
      `/companies/${req.companyId}/positions/${req.positionId}`,
    );
    return data;
  }
}
