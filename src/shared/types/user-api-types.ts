export interface ApiError {
  status: number;
  data?: {
    message?: string;
    error?: string;
    statusCode?: number;
  };
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponce {
  access_token: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
  nickname: string;
  lang: string;
}

export interface ISingleChat {
  id: number;
  messages: IMessage[];
  name: string;
  muted: number;
  avatar: string;
  hasMore: boolean;
}

export interface IMessage {
  id: number;
  message: string;
  user_id: number;
  chat_id: number;
  read: number;
  created_at: string;
  updated_at: string;
  attachment: null | string;
  attachment_type: null | string;
  fromYou: boolean;
}

export interface IChat {
  avatar: string;
  name: string;
  last_message: IMessage;
  unread_count: number;
  muted: number;
  messages: any[];
}

export interface ChatsResponse {
  [chatId: string]: IChat;
}

export interface IAccountSettings {
  nickname: string;
  name: string;
  lang: string;
  email: string;
  profilePicture: string;
}

export interface RequestUpdateUserData {
  userId: number;
  data: FormData;
}

export interface RequestSendChatMessage {
  chatId: number;
  message: string
}

export interface ResponceSendChatMessage {
  chat_id: number;
  message: string;
  user_id: number;
  updated_at: string;
  created_at: string;
  id: number;
}

export interface EditMessageDTO {
  messageId: number;
  message: string
}