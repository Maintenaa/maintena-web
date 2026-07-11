export interface ApiResponse<T extends object> {
  status: "success" | "error";
  message: string;
  data: T;
}

export interface PaginatedApiResponse<T extends object> extends ApiResponse<T> {
  pagination: {
    perPage: number;
    currentPage: number;
    totalPage: number;
    totalCount: number;
  };
}
