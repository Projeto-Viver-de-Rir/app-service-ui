export interface NonPayment {
  id: string;
  name: string;
  description: string;
  amount: number;
  quantity: number;
  volunteerId: string;
  volunteer: VolunteerReport;
  createdAt: string;
}

export interface Presence {
  id: string;
  volunteerId: string;
  previousMonthAttendance: number;
  lastMonthAttendance: number;
  volunteer: VolunteerReport;
  createdAt: string;
}

export interface VolunteerReport {
  id: string;
  name: string;
  nickname: string;
  photo: string;
  accountId: string;
}

export interface NonPaymentsResponse {
  result: Array<NonPayment>;
  skip: number;
  total: number;
  limit: number;
  currentPage: number;
  totalPages: number;
  totalItems: number;
}