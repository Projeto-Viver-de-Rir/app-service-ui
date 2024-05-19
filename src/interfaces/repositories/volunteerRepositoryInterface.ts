import type { volunteer,volunteersResponse } from '../../entities/volunteer'

//abstract
export interface volunteerRepositoryInterface {
  get(): Promise<volunteersResponse>,
  getById(id:string): Promise<volunteer>
}