export interface volunteer {
  id: string;
  name: string;
  nickname: string;
  email: string;
  phone: string;
  photo: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  birthDate: string;
  identifier: string;
  availability: string;
  comments: string;
  status: string;
  lastMonthAttendances: number;
  actualMonthAttendances: number;
  lastMonthAbsences: number;
  actualMonthAbsences: number;
  permissions: string[];
}

export interface volunteersResponse {
  result: Array<volunteer>;
  skip: number;
  total: number;
  limit: number;
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface volunteerResponse {
  volunteer: volunteer;
  skip: number;
  total: number;
  limit: number;
}
