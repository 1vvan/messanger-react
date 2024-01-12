import { ChatsResponse } from "@/shared/types/user-api-types";
import { api } from "./api";

export const chatsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserChats: builder.query<ChatsResponse, string>({
      query: () => ({ url: "/chats" }),
    }),
  }),
});

export const {useGetAllUserChatsQuery} = chatsApi