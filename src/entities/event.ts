export interface event {
    id: number
    name: string
    description: string
    address: string
    city: string
    meeting_point: string
    date: string
    time: string
    occupancy: number
    organizer: number
    finalized: boolean
    volunteers: eventVolunteers[]
  }

export interface eventVolunteers{
  id: number
  name: string
  photo: string
}

  export interface eventsResponse {
    events: Array<event>
    skip: number
    total: number
    limit: number
  }
  
  export interface eventResponse {
    event: event
    skip: number
    total: number
    limit: number
  }

  export interface finishEventRequest {
    volunteersPresent: number[]
  }