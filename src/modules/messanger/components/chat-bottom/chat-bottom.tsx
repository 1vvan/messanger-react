import React from "react";
import styles from "./chat-bottom.module.scss";
import { Icon } from "@/shared/components/icon/icon";
import { ICON_COLLECTION } from "@/shared/components/icon/icon-list";

interface ChatBottomProps {
  message: string;
  handleChangeMessage: (message: string) => void;
  handleSendMessage: () => void;
}

export const ChatBottom: React.FC<ChatBottomProps> = ({
  message,
  handleChangeMessage,
  handleSendMessage,
}) => {
  return (
    <div className={styles["chat-window__bottom"]}>
      <div className={styles["chat-window__bottom_clip"]}>
        <Icon
          icon={ICON_COLLECTION.clip}
          iconSize="14px"
          hasStroke={false}
          iconColor="#a1a1a1"
        />
      </div>
      <div className={styles["chat-window__bottom_message"]}>
        <input
          type="text"
          placeholder="Type your message here.."
          value={message}
          onChange={(e) => handleChangeMessage(e.target.value)}
        />
      </div>
      <button
        className={styles["chat-window__bottom_button"]}
        onClick={handleSendMessage}
      >
        Send message
      </button>
    </div>
  );
};
