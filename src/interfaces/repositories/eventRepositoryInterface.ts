import type {
  event,
  eventsResponse,
  eventResponse,
  finishEventRequest,
} from "../../entities/event";

//abstract
export interface eventRepositoryInterface {
  getEvents(name: string): Promise<eventsResponse>;
  getById(id: string): Promise<eventResponse>;

  create(event: event): Promise<void>;
  update(event: event): Promise<void>;
  finish(eventId: string, request: finishEventRequest): Promise<void>;
  delete(eventId: string): Promise<void>;
}
