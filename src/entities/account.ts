interface volunteer {
  id: number;
  identifier: string
}


export interface accountResponse {
  id: number;
  email: string;
  photo: string;
  volunteer: volunteer
}


export interface account {
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