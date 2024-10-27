export interface debt {
  id: string;
  name: string;
  description: string;
  amount: number;
  dueDate: Date | string;
  volunteerId: string;
  paidAt: Date | string | null;
  paidBy: string;
  volunteer: volunteerDebt;
}

export interface volunteerDebt {
  id: string;
  name: string;
  accountId: string;
}

export class payRequest {
  constructor(public paidAt: Date) {}
}

export interface debtsResponse {
  result: Array<debt>;
  skip: number;
  total: number;
  limit: number;
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface debtResponse {
  result: debt;
  skip: number;
  total: number;
  limit: number;
}
