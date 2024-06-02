import axios, { AxiosResponse } from 'axios'

import type { ApiInterface } from '../interfaces/services/apiInterface'
import { useAuthStore } from '@/stores/auth';

export class Api implements ApiInterface {
  client = axios.create({
    baseURL: 'https://institutional-app-iwaxs.ondigitalocean.app/api/',
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

  async invokeWithToken<T = any>(url: string, token:string): Promise<AxiosResponse<T>> {
    
    const config = {
      headers: {
         Authorization: "Bearer " + token
      }
    }

    return await this.client.request({
      url,
      headers: {
        Authorization: "Bearer " + token
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
  async delete<T = any>(url : string) : Promise<void> {   
    
    const auth: any = useAuthStore();

    const config = {
      headers: {
         Authorization: "Bearer " + auth.token
      }
    }
    return await this.client.delete(url, config).then(function (response) {
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