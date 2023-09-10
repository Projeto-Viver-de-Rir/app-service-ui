export interface volunteer {
    id: number
    name: string
    nickname: string
    email: string
    phone: string
    address: string,
    city: string
    state : string,
    zip : string,
    birth_date: string,
    identifier: string,
    availability: string,
    comments: string,
    status: string
  }

  export interface volunteersResponse {
    volunteers: Array<volunteer>
    skip: number
    total: number
    limit: number
  }

  export interface volunteerResponse {
    volunteer: volunteer
    skip: number
    total: number
    limit: number
  }