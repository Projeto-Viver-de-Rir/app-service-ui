export interface debt {
    id: string,
    name: string,
    description: string,
    amount: number,
    dueDate: Date,
    volunteerId: string,
    paidAt: Date | null,
    paidBy: string
  }


  export class payRequest {
    constructor(
      public paidAt: Date
    ) {}
  }

  export interface debtsResponse {
    result: Array<debt>
    skip: number
    total: number
    limit: number
  }

  export interface debtResponse {
    result: debt
    skip: number
    total: number
    limit: number
  }