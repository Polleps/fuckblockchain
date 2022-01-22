export interface TimePeriod {
  time: string;
  data: number;
}

export interface Cache {
  expires: string;
  data: TimePeriod[]
}
