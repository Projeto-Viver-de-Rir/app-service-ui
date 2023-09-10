import { inject, injectable } from 'tsyringe'

import type { accountRepositoryInterface } from '../interfaces/repositories/accountRepositoryInterface'
import type { accountResponse } from '../entities/account'
import type { Api } from '../services/api'

@injectable()
export class accountRepository implements accountRepositoryInterface {
  constructor(@inject('ApiService') private apiService: Api) {}

  public async getCurrentUser(): Promise<accountResponse> {
    const response = await this.apiService.invoke('accounts')
    return response.data
  }

}
