import axios, { AxiosError, type AxiosResponse } from "axios";
import { router } from "@/router";

import type { ApiInterface } from "../interfaces/services/apiInterface";
import { useAuthStore } from "@/stores/auth";

const axiosClient = axios.create({
  baseURL: "https://institutional-app-iwaxs.ondigitalocean.app/api/",
  timeout: 9000,
});

axiosClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if ((error?.response?.status === 401 || error?.response?.status === 403) && !originalRequest?._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');

        const newRequest = await axiosClient.post("/identity/refresh", {
          refreshToken,
        });
        const { accessToken, refreshToken: newRefreshToken } = newRequest.data;

        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newRequest.data.accessToken}`;

        return axiosClient(originalRequest);
      } catch (refreshErr) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        router.push({ path: "/auth/login", replace: true });

        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);

export class Api implements ApiInterface {
  client = axiosClient;

  getToken(): string {
    const accessToken = localStorage.getItem("token");
    return "Bearer " + accessToken;
  }

  async invoke<T = any>(url: string): Promise<AxiosResponse<T>> {
    const config = {
      headers: {
        Authorization: this.getToken(),
      },
    };

    return await this.client.request({
      url,
      headers: {
        Authorization: this.getToken(),
      },
    });
  }

  async invokeWithToken<T = any>(
    url: string,
    token: string
  ): Promise<AxiosResponse<T>> {
    const config = {
      headers: {
        Authorization: this.getToken(),
      },
    };

    return await this.client.request({
      url,
      headers: {
        Authorization: this.getToken(),
      },
    });
  }

  async post<T = any>(url: string, request: T): Promise<void> {
    const auth: any = useAuthStore();

    const config = {
      headers: {
        Authorization: this.getToken(),
      },
    };
    return await this.client
      .post(url, request, config)
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
  }
  async delete<T = any>(url: string): Promise<void> {
    const auth: any = useAuthStore();

    const config = {
      headers: {
        Authorization: this.getToken(),
      },
    };
    return await this.client
      .delete(url, config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  async put<T = any>(url: string, request: T): Promise<void> {
    const config = {
      headers: {
        Authorization: this.getToken(),
      },
    };
    return await this.client
      .put(url, request, config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async patch<T = any>(url: string, request: T): Promise<void> {
    const auth: any = useAuthStore();

    const config = {
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    };
    return await this.client
      .patch(url, request, config)
  }
  
}
