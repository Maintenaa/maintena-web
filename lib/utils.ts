import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    if (!error.response) return error.message;
    const { data } = error.response!;
    if (typeof data == "string") return data;
    return error.response?.data?.message || error.message;
  }
  if (error instanceof Error) return error.message;
  return "Unknown error occured";
}
