import React from "react";
import styles from './chat-window.module.scss'
import { ChatTopBar } from "../chat-top-bar/chat-top-bar";
import { useChatWindow } from "./use-chat-window";
import { ChatBottom } from "../chat-bottom/chat-bottom";
import { ChatMain } from "../chat-main/chat-main";

interface ChatWindowProps{
    chatId: number
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ chatId }) => {
  const { models, commands } = useChatWindow({ chatId: chatId });
  return (
    <div className={styles["chat-window"]}>
      <ChatTopBar chat={models.chat} />
      <ChatMain chat={models.chat} chatIsLoading={models.chatIsLoading} />
      <ChatBottom
        message={models.message}
        handleChangeMessage={commands.handleChangeMessage}
        handleSendMessage={commands.handleSendMessage}
      />
    </div>
  );
};