import { inject, injectable } from "tsyringe";
import type { Api } from "../services/api";
import type { operationRepositoryInterface } from "@/interfaces/repositories/operationRepositoryInterface";
import type {
  createDebtsRequest,
  createEventRequest,
} from "@/entities/operation";

@injectable()
export class operationRepository implements operationRepositoryInterface {
  constructor(@inject("ApiService") private apiService: Api) {}
  public async createDebts(request: createDebtsRequest): Promise<void> {
    await this.apiService.post("operation/debts", request);
  }
  public async createEvents(request: createEventRequest): Promise<void> {
    await this.apiService.post("operation/events", request);
  }
}
