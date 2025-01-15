import {
  ChatsResponse,
  EditMessageDTO,
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
    sendMessage: builder.mutation<
      ResponceSendChatMessage,
      RequestSendChatMessage
    >({
      query: (data: RequestSendChatMessage) => ({
        url: `/chats/${data.chatId}`,
        method: "POST",
        body: { message: data.message },
      }),
    }),
    muteChat: builder.mutation<string, number>({
      query: (chatId: number) => ({
        url: `/chats/${chatId}/mute`,
        method: "POST",
      }),
    }),
    unmuteChat: builder.mutation<string, number>({
      query: (chatId: number) => ({
        url: `/chats/${chatId}/unmute`,
        method: "POST",
      }),
    }),
    deleteMessage: builder.mutation<string, number>({
      query: (messageId: number) => ({
        url: `/messages/${messageId}/delete`,
        method: "POST",
      }),
    }),
    editMessage: builder.mutation<ResponceSendChatMessage, EditMessageDTO>({
      query: (data: EditMessageDTO) => ({
        url: `/messages/${data.messageId}`,
        method: "POST",
        body: { message: data.message },
      }),
    }),
    markChatAsRead: builder.mutation<string, number>({
      query: (chatId: number) => ({
        url: `/chats/${chatId}/mark-as-read`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAllUserChatsQuery,
  useGetChatQuery,
  useSendMessageMutation,
  useMuteChatMutation,
  useUnmuteChatMutation,
  useDeleteMessageMutation,
  useEditMessageMutation,
  useMarkChatAsReadMutation
} = chatsApi;
