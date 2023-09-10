import { inject, injectable } from 'tsyringe'

import type { authRepositoryInterface } from '../interfaces/repositories/authRepositoryInterface'
import type { Api } from '../services/api'

@injectable()
export class AuthRepository implements authRepositoryInterface {
  constructor(@inject('ApiService') private apiService: Api) {}

}
