export interface config {
    id: string,
    type: string,    
    description: string,
    value: string
  }

  export interface configsResponse {
    result: Array<config>
    skip: number
    total: number
    limit: number
  }

  export interface configResponse {
    result: config
    skip: number
    total: number
    limit: number
  }