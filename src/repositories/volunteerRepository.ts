import { inject, injectable } from 'tsyringe'

import type { volunteer, volunteerResponse,volunteersResponse } from '../entities/volunteer'
import type { volunteerRepositoryInterface } from '../interfaces/repositories/volunteerRepositoryInterface'
import type { Api } from '../services/api'

@injectable()
export class volunteerRepository implements volunteerRepositoryInterface {
  constructor(@inject('ApiService') private apiService: Api) {}

  public async get(): Promise<volunteersResponse> {
    const response = await this.apiService.invoke('volunteer')
    return response.data
  }

  public async getById(id:string): Promise<volunteer> {
    const response = await this.apiService.invoke('volunteer/'+id)
    console.log(response);
    return response.data
  }
}
