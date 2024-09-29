import { inject, injectable } from "tsyringe";

import type {
  volunteer,
  volunteerResponse,
  volunteersResponse,
} from "../entities/volunteer";
import type { volunteerRepositoryInterface } from "../interfaces/repositories/volunteerRepositoryInterface";
import type { Api } from "../services/api";

@injectable()
export class volunteerRepository implements volunteerRepositoryInterface {
  constructor(@inject("ApiService") private apiService: Api) {}
  public async update(volunteer: volunteer): Promise<void> {
    await this.apiService.put("volunteer/" + volunteer.id, volunteer);
  }

  public async get(
    name: string,
    nickname: string,
    page: number,
    pageSize: number
  ): Promise<volunteersResponse> {
    const response = await this.apiService.invoke(
      "volunteer?name=" +
        name +
        "&nickname=" +
        nickname +
        "&currentPage=" +
        page +
        "&pageSize=" +
        pageSize
    );
    return response.data;
  }

  public async getByQuery(query: string): Promise<volunteersResponse> {
    const response = await this.apiService.invoke("volunteer?"  + query);
    return response.data;
  }

  public async getById(id: string): Promise<volunteer> {
    const response = await this.apiService.invoke("volunteer/" + id);
    return response.data;
  }

  public async delete(id: string): Promise<void> {
    await this.apiService.delete("volunteer/" + id);
  }
}
