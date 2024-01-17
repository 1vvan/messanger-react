import { chatsApi } from "@/app/services/chatsApi";
import { userApi } from "@/app/services/userApi";
import { IChat } from "@/shared/types/user-api-types";
import { useState } from "react";

export const useMessanger = () => {
    const { data: user } = userApi.useGetCurrentUserQuery('');
    const { data: userChats, isLoading: isChatsLoading } = chatsApi.useGetAllUserChatsQuery('');
    chatsApi.useGetAllUserChatsQuery("");
    const [selectedChat, setSelectedChat] = useState<IChat>();
    const handleSelectChat = (chatId) => {
        const chatToFind = userChats && userChats[chatId];
        setSelectedChat(chatToFind);
    }

    return {
      models: {
        user,
        userChats,
        selectedChatId: selectedChat?.last_message.chat_id,
        isChatsLoading,
      },
      commands: {
        handleSelectChat,
      },
    };
}