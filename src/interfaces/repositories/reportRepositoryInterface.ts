import type { debtsReportResponse } from "../../entities/report";

//abstract
export interface reportRepositoryInterface {
  getDebtsReport(): Promise<debtsReportResponse>;
  newDebtsReport(): Promise<void>;
}
