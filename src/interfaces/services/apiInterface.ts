import type { AxiosInstance, AxiosResponse } from "axios";

export interface ApiInterface {
  client: AxiosInstance;
  invoke<T = any>(url: string): Promise<AxiosResponse<T>>;
  post<T = any>(url: string, request: T): Promise<void>;
  put<T = any>(url: string, request: T): Promise<void>;
  patch<T = any>(url: string, request: T): Promise<void>;
}
