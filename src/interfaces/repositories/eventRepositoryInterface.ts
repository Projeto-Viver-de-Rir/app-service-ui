import type { event, eventsResponse, eventResponse, finishEventRequest } from '../../entities/event'

//abstract
export interface eventRepositoryInterface {
  getEvents(): Promise<eventsResponse>
  getById(id:number): Promise<eventResponse>

  create(event: event): Promise<void>;
  update(event: event): Promise<void>;
  finish(eventId : number,request: finishEventRequest): Promise<void>;
  confirm(eventId : number): Promise<void>;
}