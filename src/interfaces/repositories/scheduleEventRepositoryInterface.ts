import type {
  scheduleEvent,
  scheduleEventResponse,
  scheduleEventsResponse,
} from "../../entities/scheduleEvent";

//abstract
export interface scheduleEventRepositoryInterface {
  getScheduleEvents(
    name: string,
    page: number,
    pageSize: number
  ): Promise<scheduleEventsResponse>;

  getById(id: string): Promise<scheduleEventResponse>;
  update(scheduleEvent: scheduleEvent): Promise<void>;
}
