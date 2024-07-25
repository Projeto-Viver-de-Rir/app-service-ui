export interface debtsReport {
  id: string;
  name: string;
  nickname: string;
  photo: string;
  phone: number;
  quantity: number;
  amount: number;
}

export interface debtsReportResponse {
  result: Array<debtsReport>;
}
