import { inject, injectable } from "tsyringe";

import type { eventPresenceResponse } from "../entities/eventPresence";
import type { debtRepositoryInterface } from "../interfaces/repositories/debtRepositoryInterface";
import type { Api } from "../services/api";
import type {
  debtsResponse,
  debtResponse,
  debt,
  payRequest,
} from "@/entities/debt";

@injectable()
export class debtRepository implements debtRepositoryInterface {
  constructor(@inject("ApiService") private apiService: Api) {}
  public async getDebts(
    volunteerId: string,
    name: string,
    page: number,
    pageSize: number
  ): Promise<debtsResponse> {
    const response = await this.apiService.invoke(
      "debt?volunteerId=" +
        volunteerId +
        "&name=" +
        name +
        "&currentPage=" +
        page +
        "&pageSize=" +
        pageSize
    );
    return response.data;
  }
  public async getById(id: string): Promise<debtResponse> {
    const response = await this.apiService.invoke("debt/" + id);
    return response.data;
  }
  public async update(debt: debt): Promise<void> {
    await this.apiService.put("debt/" + debt.id, debt);
  }
  public async pay(id: string, request: payRequest): Promise<void> {
    await this.apiService.patch("debt/" + id, request);
  }
}
