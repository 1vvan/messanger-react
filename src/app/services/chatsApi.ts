import {
  ChatsResponse,
  ISingleChat,
  RequestSendChatMessage,
  ResponceSendChatMessage,
} from "@/shared/types/user-api-types";
import { api } from "./api";

export const chatsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserChats: builder.query<ChatsResponse, string>({
      query: () => ({ url: "/chats" }),
    }),
    getChat: builder.query<ISingleChat, number>({
      query: (chatId) => ({ url: `/chats/${chatId}?offset=0` }),
    }),
    sendMessage: builder.mutation<ResponceSendChatMessage, RequestSendChatMessage>({
      query: (data: RequestSendChatMessage) => ({
        url: `/chats/${data.chatId}`,
        method: "POST",
        body: { message: data.message },
      }),
    }),
  }),
});

export const {useGetAllUserChatsQuery, useGetChatQuery, useSendMessageMutation} = chatsApi