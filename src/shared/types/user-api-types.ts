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

export interface IChat {
  avatar: string;
  name: string;
  last_message: {
    id: number;
    message: string;
    user_id: number;
    chat_id: number;
    read: number;
    created_at: string;
    updated_at: string;
    attachment: null | any; 
    attachment_type: null | string; 
  };
  unread_count: number;
  muted: number;
  messages: any[];
}

export interface ChatsResponse {
  [chatId: string]: IChat;
}
