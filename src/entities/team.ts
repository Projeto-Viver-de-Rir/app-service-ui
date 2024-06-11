export interface team {
    id: string,
    name: string,
    description: string,
    type: string,
    status: string
  }

  export interface teamsResponse {
    result: Array<team>
    skip: number
    total: number
    limit: number
  }

  export interface teamResponse {
    result: team
    skip: number
    total: number
    limit: number
  }