export class accountVolunteer {
  constructor(
    public name: string,
    public nickname: string, 
    public address: string,
    public city: string, 
    public state: string,
    public zip: string, 
    public country: string,
    public birthDate: Date, 
    public availability: string,
    public identifier: string, 
    public photo: string,
  ) {}
}


export interface accountResponse {
  id: number;
  email: string;
  photo: string;
  volunteer: accountVolunteer
}


export interface account {
  id: number;
  email: string;
  phone: string;
  photo: string;
  permissions?: Array<string>;
  volunteer: accountVolunteer
}

export interface accountEnroll {
  name: string,
  nickname: string,
  address: string,
  city: string,
  state: string,
  zip: string,
  country: string,
  birthDate: Date,
  availability: string,
  identifier: string,
  photo: string
}