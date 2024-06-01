import type { debt, payRequest,debtsResponse,debtResponse } from '../../entities/debt'

//abstract
export interface debtRepositoryInterface {
  getDebts(volunteerId: string, name: string,page:number, pageSize:number): Promise<debtsResponse>
  getById(id:string): Promise<debtResponse>

  update(debt: debt): Promise<void>;
  pay(id : string,request: payRequest): Promise<void>;
}