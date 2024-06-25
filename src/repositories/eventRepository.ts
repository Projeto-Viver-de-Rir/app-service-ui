import { inject, injectable } from "tsyringe";

import type {
  eventsResponse,
  eventResponse,
  event,
  finishEventRequest,
} from "../entities/event";
import type { eventRepositoryInterface } from "../interfaces/repositories/eventRepositoryInterface";
import type { Api } from "../services/api";

@injectable()
export class eventRepository implements eventRepositoryInterface {
  constructor(@inject("ApiService") private apiService: Api) {}
  public async delete(eventId: string): Promise<void> {
    await this.apiService.delete("event/" + eventId);
  }

  public async getEvents(name: string): Promise<eventsResponse> {
    console.log(name);
    if (name !== "") {
      const response = await this.apiService.invoke("event?name=" + name);
      return response.data;
    }

    const response = await this.apiService.invoke("event");
    return response.data;
  }

  public async getById(id: string): Promise<eventResponse> {
    const response = await this.apiService.invoke("event/" + id);
    return response.data;
  }

  public async create(event: event): Promise<void> {
    await this.apiService.post("event/", event);
  }

  public async update(event: event): Promise<void> {
    await this.apiService.put("event/" + event.id, event);
  }

  public async finish(
    eventId: string,
    request: finishEventRequest
  ): Promise<void> {
    await this.apiService.put("event/" + eventId + "/conclusion", request);
  }
}
