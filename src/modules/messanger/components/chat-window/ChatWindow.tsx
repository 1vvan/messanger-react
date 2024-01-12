import React from "react";
import styles from './chat-window.module.scss'
import { ChatTopBar } from "../chat-top-bar/chat-top-bar";
import { useChatWindow } from "./use-chat-window";

interface ChatWindowProps{
    chatId: number
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ chatId }) => {
  const { models } = useChatWindow({ chatId: chatId });

  return (
    <div className={styles["chat-window"]}>
          <ChatTopBar chat={models.chat} />
    </div>
  );
};