import React from "react";
import styles from "./chat-main.module.scss";
import { ISingleChat } from "@/shared/types/user-api-types";
import { CircularProgress } from "@mui/material";
import { MessageItem } from "@/shared/components/message-item/message-item";
import { dateFormatter } from "@/shared/helpers/dateFormatter";

interface ChatManiProps {
  chat: ISingleChat | undefined;
  chatIsLoading: boolean;
}

export const ChatMain: React.FC<ChatManiProps> = ({ chat, chatIsLoading }) => {
  const renderMessagesWithDateHeaders = () => {
    let currentDate = "";

    return chat?.messages.map((message) => {
      const messageDate = new Date(message.created_at).toLocaleDateString();
      const todayDateKey = new Date().toLocaleDateString();

      if (currentDate !== messageDate) {
        currentDate = messageDate;
        return (
          <React.Fragment key={messageDate}>
            <div className={styles["message-date"]}>
              <span>
                {todayDateKey === messageDate
                  ? "Today"
                  : dateFormatter(messageDate)}
              </span>
            </div>
            <MessageItem
              message={message}
              key={message.id}
              avatar={chat.avatar}
            />
          </React.Fragment>
        );
      }

      return (
        <MessageItem message={message} key={message.id} avatar={chat.avatar} />
      );
    });
  };

  return (
    <div className={styles["chat-window__main"]}>
      {chatIsLoading && (
        <div className={styles["chat-window__main_loading"]}>
          <CircularProgress size={42} />
        </div>
      )}
      <div className={styles["chat-window__main_list"]}>
        {renderMessagesWithDateHeaders()}
      </div>
    </div>
  );
};
