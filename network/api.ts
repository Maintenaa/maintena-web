import axios from "axios";

class NetworkApi {
  public client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  public setToken(token: string) {
    this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

export const api = new NetworkApi();
