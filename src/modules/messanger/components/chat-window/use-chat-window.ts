import { chatsApi } from "@/app/services/chatsApi";
import {ISingleChat } from "@/shared/types/user-api-types";
import { useEffect, useState } from "react";

export const useChatWindow = ({ chatId }) => {
  const {
    data: chat,
    isLoading: chatIsLoading,
    refetch: refetchChat,
  } = chatsApi.useGetChatQuery(chatId);
  const [sendMessage] = chatsApi.useSendMessageMutation();
  const [message, setMessage] = useState('');
  const [reversedChat, setReversedChat] = useState<ISingleChat>();

  const handleChangeMessage = (message) => {
    setMessage(message);
  };

  const handleSendMessage = async () => {
    await sendMessage({ chatId, message: message })
    refetchChat();
  };

  useEffect(() => {
    if (chat) {
      const reversedMessages = [...chat.messages].reverse();
      const reversedChatArray = { ...chat, messages: reversedMessages };
      setReversedChat(reversedChatArray);
    }
  }, [chat]);

  return {
    models: {
      chat: reversedChat ? reversedChat : chat,
      chatIsLoading,
      message,
    },
    commands: {
      handleChangeMessage,
      handleSendMessage,
    },
  };
};
