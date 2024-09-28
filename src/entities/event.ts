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
  capacity: number;
  presences: Array<eventVolunteerResponse>;
  coordinators: Array<eventVolunteerResponse>;
  status: number;
}

export interface eventVolunteerResponse {
  id: number;
  volunteer: eventVolunteers;
}

export interface eventVolunteers {
  id: number;
  accountId: string;
  name: string;
  nickname: string;
  photo: string;
}

export interface eventsResponse {
  result: Array<event>;
  skip: number;
  total: number;
  limit: number;
  currentPage: number;
  totalPages: number;
  totalItems: number;
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
