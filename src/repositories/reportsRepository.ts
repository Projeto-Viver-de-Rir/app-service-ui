import { inject, injectable } from "tsyringe";

import type { reportsRepositoryInterface } from "../interfaces/repositories/reportsRepositoryInterface";
import type { Api } from "../services/api";
import type {
  NonPaymentsResponse,
} from "@/entities/reports";

@injectable()
export class reportsRepository implements reportsRepositoryInterface {
  constructor(@inject("ApiService") private apiService: Api) {}
  public async getNonPaymentsByQuery(query: string): Promise<NonPaymentsResponse> {
    const response = await this.apiService.invoke("report/debts?" + query);
    return response.data;
  }

  public async generateNonPaymentsReport(): Promise<void> {
    await this.apiService.post("report/debts");
  }

  public async getPresencesByQuery(query: string): Promise<NonPaymentsResponse> {
    const response = await this.apiService.invoke("report/presences?" + query);
    return response.data;
  }

  public async generatePresencesReport(): Promise<void> {
    const response = await this.apiService.post("report/presences");
    return response;
  }

  public async deleteNonPayment(id: string): Promise<void> {
    await this.apiService.delete("report/debts/" + id);
  }

  public async deletePresence(id: string): Promise<void> {
    await this.apiService.delete("report/presences/" + id);
  }
}
