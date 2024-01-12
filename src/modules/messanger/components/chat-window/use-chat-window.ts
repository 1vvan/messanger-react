import { chatsApi } from "@/app/services/chatsApi";

export const useChatWindow = ({chatId}) => {
    const { data: chat } = chatsApi.useGetChatQuery(chatId);
    return {
      models: {
        chat,
      },
      commands: {},
    };
}