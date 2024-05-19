export interface eventPresence {
    id: string
    eventId: string
    registrationAt: string
    attended: boolean
    eventPresenceVolunteer: eventPresenceVolunteer
  }

export interface eventPresenceVolunteer{
    id: number
    name: string
    photo: string
  }

export interface eventPresenceResponse {
    result: Array<eventPresence>
    currentPage: number
    totalPages: number
    totalItems: number
  }