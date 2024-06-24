import type {
  createEventRequest,
  createDebtsRequest,
} from "../../entities/operation";

//abstract
export interface operationRepositoryInterface {
  createDebts(request: createDebtsRequest): Promise<void>;
  createEvents(request: createEventRequest): Promise<void>;
}
