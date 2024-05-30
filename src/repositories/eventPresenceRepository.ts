import { inject, injectable } from 'tsyringe'

import type { eventPresenceResponse } from '../entities/eventPresence'
import type { eventPresenceRepositoryInterface } from '../interfaces/repositories/eventPresenceRepositoryInterface'
import type { Api } from '../services/api'

@injectable()
export class eventPresenceRepository implements eventPresenceRepositoryInterface {
    constructor(@inject('ApiService') private apiService: Api) {}

    public async getById(id: string): Promise<eventPresenceResponse> {
        const response = await this.apiService.invoke('event-presence?eventId='+ id +'&currentPage=1&pageSize=15')
        
        return response.data
    }
    public async create(eventId: string, volunteerId: string): Promise<void> {
        await this.apiService.post('event-presence/', {eventId, volunteerId})
    }

    public async delete(presenceId: string): Promise<void> {
        await this.apiService.delete('event-presence/'+presenceId);
    }
}