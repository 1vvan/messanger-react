import React from "react";
import styles from "./message-item.module.scss";
import { IMessage } from "@/shared/types/user-api-types";
import { formatTime } from "@/shared/helpers/timeFormatter";
import { clsx } from "clsx";
import { BASE_API_IMG_URL } from "@/shared/constants/api-url";
import { Icon } from "../icon/icon";
import { ICON_COLLECTION } from "../icon/icon-list";

interface MessageItemProps {
  message: IMessage;
  avatar: string;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  avatar,
}) => {
  return (
    <div
      className={clsx(styles["message-item"], {
        [styles["message-item--your"]]: message.fromYou,
      })}
    >
      {!message.fromYou && (
        <div className={styles["message-item__avatar"]}>
          <img src={BASE_API_IMG_URL + avatar} alt="" />
        </div>
      )}

      <div className={styles["message-item__content"]}>
        <p className={styles["message-item__content_text"]}>
          {message.message}
        </p>
        <div className={styles["message-item__content_info"]}>
          {message.fromYou && 
          
          <Icon
            icon={
              message.read === 0
                ? ICON_COLLECTION.sendIcon
                : ICON_COLLECTION.readIcon
            }
            iconColor="#27AE60"
            iconSize="14px"
            hasStroke={false}
          />
          }
          <span>{formatTime(message.updated_at)}</span>
        </div>
      </div>
    </div>
  );
};
