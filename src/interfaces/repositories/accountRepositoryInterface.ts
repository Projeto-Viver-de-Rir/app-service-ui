import type { accountResponse } from '../../entities/account'
//abstract
export interface accountRepositoryInterface {
    getCurrentUser(): Promise<accountResponse>
}