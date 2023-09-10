export interface account {
    id: number
    name: string
    nickname: string
    email: string
    photo: string
    access_failed_count: number
    lockout: string
  }
  

  export interface accountResponse {
    account: account
    skip: number
    total: number
    limit: number
  }
