import type { volunteerResponse,volunteersResponse } from '../../entities/volunteer'

//abstract
export interface volunteerRepositoryInterface {
  get(): Promise<volunteersResponse>,
  getById(id:number): Promise<volunteerResponse>
}