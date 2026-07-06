export interface ApiResponse<T extends object> {
  status: "success" | "error";
  message: string;
  data: T;
}
