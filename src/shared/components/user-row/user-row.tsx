import { Icon } from "@/shared/components/icon/icon";
import React from "react";
import { ICON_COLLECTION } from "@/shared/components/icon/icon-list";
import clsx from "clsx";
import styles from "./user-row.module.scss";
import { Avatar } from "@mui/material";

export type Status = "sended" | "readed";
interface UserRowProps {
  userName: string;
  message: string;
  status: Status;
  avatar?: string;
  isTyping?: boolean;
  time: string;
}

export const UserRow: React.FC<UserRowProps> = ({
  userName,
  message,
  status,
  avatar,
  isTyping = false,
  time,
}) => {
  return (
    <div className={styles["user-row"]}>
      <div className={styles["user-row__avatar"]}>
        <Avatar
          alt="User"
          src={avatar ? avatar : ""}
          sx={{ width: 32, height: 32 }}
        />
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
            {isTyping ? "... is typing" : message}
          </h4>
          <span>
            <Icon
              icon={
                status === "readed"
                  ? ICON_COLLECTION.readIcon
                  : ICON_COLLECTION.sendIcon
              }
              hasStroke={false}
              iconSize="12px"
              iconColor={"#27AE60"}
            />
          </span>
        </div>
      </div>
    </div>
  );
};
