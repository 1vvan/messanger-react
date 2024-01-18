import React, { useEffect, useRef } from "react";
import styles from "./chat-bottom.module.scss";
import { Icon } from "@/shared/components/icon/icon";
import { ICON_COLLECTION } from "@/shared/components/icon/icon-list";
import { clsx } from 'clsx';

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "36px";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        (30 * window.innerHeight) / 100
      )}px`;
    }
  }, [message]);
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
        <textarea
          ref={textareaRef}
          placeholder="Type your message here.."
          value={message}
          onChange={(e) => handleChangeMessage(e.target.value)}
        />
      </div>
      <button
        className={clsx(styles["chat-window__bottom_button"], {
          [styles["chat-window__bottom_button--active"]]: message.length > 0,
        })}
        onClick={handleSendMessage}
      >
        Send message
      </button>
    </div>
  );
};
