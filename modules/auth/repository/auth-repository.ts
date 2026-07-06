import { ApiResponse } from "@/modules/shared/dto/api_response";
import { LoginParams, LoginResponse } from "../dto/login";
import { api } from "@/network/api";

export default class AuthRepository {
  async login({
    email,
    password,
  }: LoginParams): Promise<ApiResponse<LoginResponse>> {
    const { data } = await api.client.post("/auth/login", { email, password });

    return data;
  }
}
