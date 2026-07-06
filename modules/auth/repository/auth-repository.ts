import { ApiResponse } from "@/modules/shared/dto/api_response";
import { LoginParams, LoginResponse } from "../dto/login";
import { api } from "@/network/api";
import { User } from "@/modules/user/dto/user";

export default class AuthRepository {
  async login({
    email,
    password,
  }: LoginParams): Promise<ApiResponse<LoginResponse>> {
    const { data } = await api.client.post("/auth/login", { email, password });
    return data;
  }

  async refreshToken(): Promise<ApiResponse<LoginResponse>> {
    const { data } = await api.client.post("/auth/refresh-token");
    return data;
  }

  async getProfile(): Promise<ApiResponse<User>> {
    const { data } = await api.client.get("/auth/profile");
    return data;
  }
}
