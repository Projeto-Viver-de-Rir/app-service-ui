export interface volunteer {
    id: string
    name: string
    nickname: string
    email: string
    phone: string
    address: string,
    city: string
    state : string,
    zip : string,
    birthDate: string,
    identifier: string,
    availability: string,
    comments: string,
    status: string,
    lastMonthAttendances : string,
    actualMonthAttendances : string,
    lastMonthAbsences : string,
    actualMonthAbsences : string,
  }

  export interface volunteersResponse {
    result: Array<volunteer>
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