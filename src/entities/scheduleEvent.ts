export interface scheduleEvent {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  meetingPoint: string;
  occupancy: string;
  dayOfWeek: string;
  occurrence: string;
  schedule: string;
}

export interface scheduleEventsResponse {
  result: Array<scheduleEvent>;
  skip: number;
  total: number;
  limit: number;
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface scheduleEventResponse {
  result: scheduleEvent;
  skip: number;
  total: number;
  limit: number;
}
