import type {
  NonPaymentsResponse,
} from "../../entities/reports";

//abstract
export interface reportsRepositoryInterface {
  getNonPaymentsByQuery(
    query: string
  ): Promise<NonPaymentsResponse>;

  getPresencesByQuery(
    query: string
  ): Promise<NonPaymentsResponse>;

  deleteNonPayment(id: string): Promise<void>;
  deletePresence(id: string): Promise<void>;
}
