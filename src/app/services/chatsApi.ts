import { ChatsResponse, ISingleChat } from "@/shared/types/user-api-types";
import { api } from "./api";

export const chatsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserChats: builder.query<ChatsResponse, string>({
      query: () => ({ url: "/chats" }),
    }),
    getChat: builder.query<ISingleChat, number>({
      query: (chatId) => ({ url: `/chats/${chatId}?offset=0` }),
    }),
  }),
});

export const {useGetAllUserChatsQuery, useGetChatQuery} = chatsApi