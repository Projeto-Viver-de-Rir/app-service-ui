export interface event {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  meetingPoint: string;
  happenAt: Date;
  date: string;
  time: string;
  occupancy: number;
}

export interface eventVolunteers {
  id: number;
  name: string;
  photo: string;
}

export interface eventsResponse {
  result: Array<event>;
  skip: number;
  total: number;
  limit: number;
}

export interface eventResponse {
  result: event;
  skip: number;
  total: number;
  limit: number;
}

export class finishEventRequest {
  constructor(public presences: string[]) {}
}
