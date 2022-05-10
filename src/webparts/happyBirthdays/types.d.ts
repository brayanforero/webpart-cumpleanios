export interface User {
  username: string;
  email: string;
}

export interface Birthday {
  id?: number;
  person: string;
  birthday: Date;
  email: string;
}

export interface BirthdaysItemReponse {
  ID: number;
  Title: string;
  Birthday: Date;
  Email: string;
}

export type BirthdaysResponse = BirthdaysItemReponse[];
