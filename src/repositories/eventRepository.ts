import { inject, injectable } from 'tsyringe'

import type { eventsResponse,eventResponse, event, finishEventRequest } from '../entities/event'
import type { eventRepositoryInterface } from '../interfaces/repositories/eventRepositoryInterface'
import type { Api } from '../services/api'

@injectable()
export class eventRepository implements eventRepositoryInterface {
  constructor(@inject('ApiService') private apiService: Api) {}

  public async getEvents(): Promise<eventsResponse> {
    const response = await this.apiService.invoke('events')
    return response.data
  }

  public async getById(id:number): Promise<eventResponse> {
    const response = await this.apiService.invoke('events/'+id)
    return response.data
  }

  public async create(event: event) : Promise<void> {
    await this.apiService.post('events/', event)
  }

  public async update(event: event) : Promise<void> {
    await this.apiService.put('events/'+ event.id, event)
  }

  public async finish(eventId : number,request: finishEventRequest) : Promise<void> {
    await this.apiService.put('events/'+ eventId+"/confirm", request)
  }

  public async confirm(eventId : number) : Promise<void> {
    await this.apiService.patch('events/'+ eventId+"/vacancy", null)
  }
}
