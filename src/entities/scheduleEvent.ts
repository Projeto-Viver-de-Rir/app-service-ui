export interface scheduleEvent {
    id: string,
    name: string,
    description: string,
    address: string,
    city: string,
    meetingPoint: string,
    occupancy: string,
    dayOfWeek: string,
    occurrence: string
  }

  export interface scheduleEventsResponse {
    result: Array<scheduleEvent>
    skip: number
    total: number
    limit: number
  }

  export interface scheduleEventResponse {
    result: scheduleEvent
    skip: number
    total: number
    limit: number
  }