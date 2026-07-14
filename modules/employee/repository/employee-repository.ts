import { ApiResponse, PaginatedApiResponse } from "@/modules/shared/dto/api_response";
import { api } from "@/network/api";
import { CreateEmployeeRequest } from "../dto/create-employee";
import { DeleteEmployeeRequest } from "../dto/delete-employee";
import { GetEmployeeByUserIdRequest } from "../dto/get-employee-by-user-id";
import { GetEmployeesRequest } from "../dto/get-employees";
import { UpdateEmployeeRequest } from "../dto/update-employee";
import { Employee } from "../dto/employee";

export class EmployeeRepository {
  async getEmployees(req: GetEmployeesRequest): Promise<PaginatedApiResponse<Employee[]>> {
    const { data } = await api.client.get(`/companies/${req.companyId}/employees`);
    return data;
  }

  async getEmployeeByUserId(req: GetEmployeeByUserIdRequest): Promise<ApiResponse<Employee>> {
    const { data } = await api.client.get(
      `/companies/${req.companyId}/employees/${req.userId}`,
    );
    return data;
  }

  async createEmployee(req: CreateEmployeeRequest): Promise<ApiResponse<Employee>> {
    const { data } = await api.client.post(
      `/companies/${req.companyId}/employees`,
      {
        name: req.name,
        email: req.email,
        password: req.password,
        positionId: req.positionId,
      },
    );
    return data;
  }

  async updateEmployee(req: UpdateEmployeeRequest): Promise<ApiResponse<Employee>> {
    const { data } = await api.client.put(
      `/companies/${req.companyId}/employees/${req.userId}`,
      {
        name: req.name,
        email: req.email,
        positionId: req.positionId,
      },
    );
    return data;
  }

  async deleteEmployee(req: DeleteEmployeeRequest) {
    const { data } = await api.client.delete(
      `/companies/${req.companyId}/employees/${req.userId}`,
    );
    return data;
  }
}
