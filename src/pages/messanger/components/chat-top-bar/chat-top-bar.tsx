import React from "react";
import styles from "./chat-top-bar.module.scss";
import { Avatar } from "@mui/material";
import { Icon } from "@/UI/icon/icon";
import { ICON_COLLECTION } from "@/UI/icon/icon-list";

export const ChatTopBar = () => {
  return (
    <div className={styles["chat-window__top-bar"]}>
      <div className={styles["chat-window__top-bar_user"]}>
        <Avatar sx={{ width: 42, height: 42 }} />
        <div className={styles["chat-window__top-bar_user-name"]}>
          <h6>Travis Barker</h6>
          <span>Online</span>
        </div>
      </div>
      <div className={styles["chat-window__top-bar_buttons"]}>
        <div className={styles["chat-window__top-bar_buttons-item"]}>
          <Icon
            icon={ICON_COLLECTION.video}
            iconSize="24px"
            iconColor="#27AE60"
            hasStroke={false}
          />
        </div>
        <div className={styles["chat-window__top-bar_buttons-item"]}>
          <Icon
            icon={ICON_COLLECTION.info}
            iconSize="24px"
            hasStroke={false}
          />
        </div>
      </div>
    </div>
  );
};
