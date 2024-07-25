import { inject, injectable } from "tsyringe";

import type { reportRepositoryInterface } from "../interfaces/repositories/reportRepositoryInterface";
import type { Api } from "../services/api";
import type { debtsReportResponse } from "@/entities/report";

@injectable()
export class reportRepository implements reportRepositoryInterface {
  constructor(@inject("ApiService") private apiService: Api) {}

  public async getDebtsReport(): Promise<debtsReportResponse> {
    const response = await this.apiService.invoke("report/debts");
    return response.data;
  }

  public async newDebtsReport(): Promise<void> {
    await this.apiService.post("report/debts", null);
  }
}
