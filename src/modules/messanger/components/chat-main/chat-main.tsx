import React from "react";
import styles from "./chat-main.module.scss";
import { ISingleChat } from "@/shared/types/user-api-types";
import { CircularProgress } from "@mui/material";
import { MessageItem } from "@/shared/components/message-item/message-item";

interface ChatManiProps {
  chat: ISingleChat | undefined;
  chatIsLoading: boolean;
}

export const ChatMain: React.FC<ChatManiProps> = ({ chat, chatIsLoading }) => {
  return (
    <div className={styles["chat-window__main"]}>
      {chatIsLoading && (
        <div className={styles["chat-window__main_loading"]}>
          <CircularProgress size={42} />
        </div>
      )}
      <div className={styles["chat-window__main_list"]}>
        {chat &&
          chat?.messages.map((item) => (
              <MessageItem message={item} key={item.id} avatar={chat.avatar} />
          ))}
      </div>
    </div>
  );
};
