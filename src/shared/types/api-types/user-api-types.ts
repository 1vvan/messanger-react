import { IUser } from "@/shared/types/IUser";

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponce {
  token: string;
  user: IUser;
}

export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
  nickname: string;
  lang: string;
}
