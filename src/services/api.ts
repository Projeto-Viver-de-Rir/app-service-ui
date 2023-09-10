import axios, { AxiosResponse } from 'axios'

import type { ApiInterface } from '../interfaces/services/apiInterface'
import { useAuthStore } from '@/stores/auth';

export class Api implements ApiInterface {
  client = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    timeout: 9000
  })
  
  async invoke<T = any>(url: string): Promise<AxiosResponse<T>> {
    
    const auth: any = useAuthStore();

    const config = {
      headers: {
         Authorization: "Bearer " + auth.token
      }
    }

    return await this.client.request({
      url,
      headers: {
        Authorization: "Bearer " + auth.token
      }
    })
  }

  async post<T = any>(url : string, request: T) : Promise<void> {   
    
    const auth: any = useAuthStore();

    const config = {
      headers: {
         Authorization: "Bearer " + auth.token
      }
    }
    return await this.client.post(url, request, config).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  async put<T = any>(url : string, request: T) : Promise<void> {    
    const auth: any = useAuthStore();

    const config = {
      headers: {
         Authorization: "Bearer " + auth.token
      }
    }
    return await this.client.put(url, request, config).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  async patch<T = any>(url : string, request: T) : Promise<void> {    
    const auth: any = useAuthStore();

    const config = {
      headers: {
         Authorization: "Bearer " + auth.token
      }
    }
    return await this.client.patch(url, request, config).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}