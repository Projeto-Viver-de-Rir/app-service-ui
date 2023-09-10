import { inject, injectable } from 'tsyringe'

import type { volunteerResponse,volunteersResponse } from '../entities/volunteer'
import type { volunteerRepositoryInterface } from '../interfaces/repositories/volunteerRepositoryInterface'
import type { Api } from '../services/api'

@injectable()
export class volunteerRepository implements volunteerRepositoryInterface {
  constructor(@inject('ApiService') private apiService: Api) {}

  public async get(): Promise<volunteersResponse> {
    const response = await this.apiService.invoke('volunteers')
    return response.data
  }

  public async getById(id:number): Promise<volunteerResponse> {
    const response = await this.apiService.invoke('volunteers/'+id)
    return response.data
  }
}
