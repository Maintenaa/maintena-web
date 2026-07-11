import { authRepository } from "@/modules/auth/auth-module";
import axios, { AxiosError } from "axios";

class NetworkApi {
  public client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  public constructor() {
    this.setInterceptors();
  }

  private setInterceptors() {
    let alreadyRefreshing = false;

    this.client.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (alreadyRefreshing) return Promise.reject(error);
        if (!(error instanceof AxiosError)) return Promise.reject(error);

        alreadyRefreshing = true;

        const unauthorizedRegex =
          /^\/auth\/(refresh-token|login|register|forgot-password|reset-password)/gi;
        const isAuthorizedPath = !unauthorizedRegex.test(
          error.config?.url || "",
        );

        if (!isAuthorizedPath) return Promise.reject(error);

        const {
          data: { accessToken },
        } = await authRepository.refreshToken();
        api.setToken(accessToken);

        return this.client.request(error.config || {});
      },
    );
  }

  public setToken(token: string) {
    this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

export const api = new NetworkApi();
