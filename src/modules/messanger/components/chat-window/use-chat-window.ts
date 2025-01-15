import { chatsApi } from "@/app/services/chatsApi";
import { ISingleChat } from "@/shared/types/user-api-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import sendSound from "@/shared/assets/audio/send-message.mp3";

export const useChatWindow = ({ chatId }) => {
  const {
    data: chat,
    isLoading: chatIsLoading, 
    refetch: refetchChat,
  } = chatsApi.useGetChatQuery(chatId);
  const [sendMessage] = chatsApi.useSendMessageMutation();
  const [muteChat] = chatsApi.useMuteChatMutation();
  const [unmuteChat] = chatsApi.useUnmuteChatMutation();
  const { refetch: refetchUserChats } = chatsApi.useGetAllUserChatsQuery("");
  const [markAsRead] = chatsApi.useMarkChatAsReadMutation();

  const [message, setMessage] = useState("");
  const [reversedChat, setReversedChat] = useState<ISingleChat>();
  const [isChatModalActive, setIsChatModalActive] = useState(false);
  const [isChatMuted, setIsChatMuted] = useState(chat?.muted === 1);
  const sendMessageSound = new Audio(sendSound);

  useEffect(() => {
    markChatAsRead();

    const intervalId = setInterval(() => {
      refetchChat();
      refetchUserChats();
    }, 10000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, [chatId]);

  const handleChangeMessage = (message) => {
    setMessage(message);
  };

  const markChatAsRead = () => {
    markAsRead(chatId);
    refetchChat();
    refetchUserChats();
  }

  const handleSendMessage = async () => {
    if (message.length > 0) {
      await sendMessage({ chatId, message: message });
      sendMessageSound.play();
      refetchChat();
      refetchUserChats();
      setMessage("");
    }
  };

  useEffect(() => {
    if (chat) {
      const reversedMessages = [...chat.messages].reverse();
      const reversedChatArray = { ...chat, messages: reversedMessages };
      setReversedChat(reversedChatArray);
    }
  }, [chat]);

  const handleChangeChatMute = () => {
    setIsChatMuted(!isChatMuted);
    const handleMuteChat = async () => {
      try {
        if (!isChatMuted) {
          await muteChat(chatId);
        } else {
          await unmuteChat(chatId);
        }
        toast.success(!isChatMuted ? "Chat muted" : "Chat unmuted");
        refetchChat();
        refetchUserChats();
      } catch (error) {
        console.error("Error muting/unmuting chat:", error);
        toast.error("Failed to mute/unmute chat");
      }
    };
    handleMuteChat();
  };

  return {
    models: {
      chat: reversedChat ? reversedChat : chat,
      chatIsLoading,
      message,
      isChatModalActive,
      isChatMuted,
    },
    commands: {
      handleChangeMessage,
      handleSendMessage,
      setIsChatModalActive,
      handleChangeChatMute,
    },
  };
};
