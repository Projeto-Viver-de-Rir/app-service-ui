import type { Api } from "../services/api";
import { inject, injectable } from "tsyringe";

import type { scheduleEventRepositoryInterface } from "../interfaces/repositories/scheduleEventRepositoryInterface";
import type {
  scheduleEventsResponse,
  scheduleEventResponse,
  scheduleEvent,
} from "@/entities/scheduleEvent";

@injectable()
export class scheduleEventRepository
  implements scheduleEventRepositoryInterface
{
  constructor(@inject("ApiService") private apiService: Api) {}

  public async getScheduleEvents(
    name: string,
    page: number,
    pageSize: number
  ): Promise<scheduleEventsResponse> {
    const response = await this.apiService.invoke(
      "schedule-event?name=" +
        name +
        "&currentPage=" +
        page +
        "&pageSize=" +
        pageSize
    );

    return response.data;
  }

  public async getById(id: string): Promise<scheduleEventResponse> {
    const response = await this.apiService.invoke("schedule-event/" + id);
    return response.data;
  }

  public async getScheduledEventsByQuery(query: string): Promise<scheduleEventsResponse> {
    const response = await this.apiService.invoke("schedule-event?" + query);
    return response.data;
  }

  public async create(event: scheduleEvent): Promise<void> {
    await this.apiService.post("schedule-event/", event);
  }

  public async update(scheduleEvent: scheduleEvent): Promise<void> {
    await this.apiService.put(
      "schedule-event/" + scheduleEvent.id,
      scheduleEvent
    );
  }
}
