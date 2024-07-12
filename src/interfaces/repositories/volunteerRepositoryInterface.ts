import type { volunteer, volunteersResponse } from "../../entities/volunteer";

//abstract
export interface volunteerRepositoryInterface {
  get(
    name: string,
    nickname: string,
    page: number,
    pageSize: number
  ): Promise<volunteersResponse>;
  getById(id: string): Promise<volunteer>;
  update(volunteer: volunteer): Promise<void>;
}
