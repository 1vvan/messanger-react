import React from "react";
import styles from "./chat-top-bar.module.scss";
import { CircularProgress } from "@mui/material";
import { Icon } from "@/shared/components/icon/icon";
import { ICON_COLLECTION } from "@/shared/components/icon/icon-list";
import { ISingleChat } from "@/shared/types/user-api-types";
import { BASE_API_URL } from "@/shared/constants/api-url";
import { handleImageError } from "@/shared/helpers/imageError";

interface ChatTopBarProps {
  chat: ISingleChat | undefined;
  setIsModalActive: (state: boolean) => void;
  handleOpenSidebar: () => void;
}

export const ChatTopBar: React.FC<ChatTopBarProps> = ({
  chat,
  setIsModalActive,
  handleOpenSidebar,
}) => {
  return (
    <div className={styles["chat-window__top-bar"]}>
      <div className={styles["chat-window__top-bar_user"]}>
        <button
          className={styles["chat-window__top-bar_user-back"]}
          onClick={handleOpenSidebar}
        >
          <Icon
            icon={ICON_COLLECTION.arrowLeft}
            iconSize="30px"
            iconColor="#a1a1a1"
            hasStroke={false}
          />
        </button>
        <div className={styles["chat-window__top-bar_user-avatar"]}>
          {chat?.avatar ? (
            <img
              src={BASE_API_URL + chat?.avatar}
              alt="User"
              onError={handleImageError}
            />
          ) : (
            <CircularProgress size={24} />
          )}
        </div>
        <div className={styles["chat-window__top-bar_user-name"]}>
          <h6>{chat?.name}</h6>
          <span>Online</span>
        </div>
      </div>
      <div className={styles["chat-window__top-bar_buttons"]}>
        <button className={styles["chat-window__top-bar_buttons-item"]}>
          <Icon
            icon={ICON_COLLECTION.video}
            iconSize="24px"
            iconColor="#27AE60"
            hasStroke={false}
          />
        </button>
        <button
          className={styles["chat-window__top-bar_buttons-item"]}
          onClick={() => setIsModalActive(true)}
        >
          <Icon icon={ICON_COLLECTION.info} iconSize="24px" hasStroke={false} />
        </button>
      </div>
    </div>
  );
};
