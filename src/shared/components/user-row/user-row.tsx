import { Icon } from "@/shared/components/icon/icon";
import React from "react";
import { ICON_COLLECTION } from "@/shared/components/icon/icon-list";
import clsx from "clsx";
import styles from "./user-row.module.scss";
import { BASE_API_URL } from "@/shared/constants/api-url";
import { handleImageError } from "@/shared/helpers/imageError";
import { CircularProgress } from "@mui/material";
import { truncateText } from "../../helpers/trunscateText";

export type Status = "sended" | "readed";
interface UserRowProps {
  userName: string;
  message: string;
  status: Status;
  avatar?: string;
  isTyping?: boolean;
  time: string;
  id?: string | number;
  isChatLoading: boolean;
  handleSelectChat: (chatId) => void;
  isCurrentChatSelected: boolean;
  unreadCount: number;
  isMuted: boolean;
}

export const UserRow: React.FC<UserRowProps> = ({
  userName,
  message,
  status,
  avatar,
  isTyping = false,
  time,
  id,
  isChatLoading,
  handleSelectChat,
  isCurrentChatSelected,
  unreadCount,
  isMuted,
}) => {
  if (isChatLoading) {
    return (
      <div
        className={clsx(styles["user-row"], {
          [styles["user-row--load"]]: isChatLoading,
        })}
      >
        <div className={styles["user-row__loader"]}></div>
        <CircularProgress size={24} />
      </div>
    );
  }
  return (
    <div
      className={clsx(styles["user-row"], {
        [styles["user-row--selected"]]: isCurrentChatSelected,
      })}
      onClick={() => handleSelectChat(id)}
    >
      <div className={styles["user-row__avatar"]}>
        {avatar ? (
          <img
            src={BASE_API_URL + avatar}
            alt="User"
            onError={handleImageError}
          />
        ) : (
          <CircularProgress size={32} />
        )}
        <div className={styles["user-row__avatar_status"]}></div>
      </div>
      <div className={styles["user-row__info"]}>
        <div className={styles["user-row__info_row"]}>
          <h4>{userName}</h4>
          <span>{time}</span>
        </div>
        <div className={styles["user-row__info_row"]}>
          <h4
            className={clsx(styles["user-row__info_row-message"], {
              [styles["user-row__info_row-message--typing"]]: isTyping,
            })}
          >
            {isTyping ? "... is typing" : truncateText(message, 30)}
          </h4>
          <div className={styles["user-row__info_row-icons"]}>
            {unreadCount ? (
              <p>{unreadCount}</p>
            ) : (
              <Icon
                icon={
                  status === "readed"
                    ? ICON_COLLECTION.readIcon
                    : ICON_COLLECTION.sendIcon
                }
                hasStroke={false}
                iconSize="18px"
                iconColor={"#27AE60"}
              />
            )}
            {isMuted && <Icon icon={ICON_COLLECTION.mute} iconSize="18px" />}
          </div>
        </div>
      </div>
    </div>
  );
};
