import { IUser } from "../IUser";

export interface LoginDTO {
  name: string;
  pass: string;
}

export interface LoginResponce {
  token: string;
  user: IUser;
}
