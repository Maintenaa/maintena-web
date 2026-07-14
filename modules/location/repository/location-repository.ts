import { ApiResponse, PaginatedApiResponse } from "@/modules/shared/dto/api_response";
import { api } from "@/network/api";
import { CreateLocationRequest } from "../dto/create-location";
import { DeleteLocationRequest } from "../dto/delete-location";
import { GetLocationsRequest } from "../dto/get-locations";
import { Location } from "../dto/location";
import { UpdateLocationRequest } from "../dto/update-location";

export class LocationRepository {
  async getLocations(req: GetLocationsRequest): Promise<PaginatedApiResponse<Location[]>> {
    const { data } = await api.client.get(`/companies/${req.companyId}/locations`);
    return data;
  }

  async createLocation(req: CreateLocationRequest): Promise<ApiResponse<Location>> {
    const { data } = await api.client.post(
      `/companies/${req.companyId}/locations`,
      { name: req.name },
    );
    return data;
  }

  async updateLocation(req: UpdateLocationRequest): Promise<ApiResponse<Location>> {
    const { data } = await api.client.put(
      `/companies/${req.companyId}/locations/${req.id}`,
      { name: req.name },
    );
    return data;
  }

  async deleteLocation(req: DeleteLocationRequest) {
    const { data } = await api.client.delete(
      `/companies/${req.companyId}/locations/${req.id}`,
    );
    return data;
  }
}
