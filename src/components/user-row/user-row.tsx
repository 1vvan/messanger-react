import { Icon } from "@/UI/icon/icon";
import React from "react";
import { ICON_COLLECTION } from "@/UI/icon/icon-list";
import { useTheme } from "../theme-context/theme-context";
import clsx from "clsx";

type Status = 'sended' | 'readed'
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
  avatar = ICON_COLLECTION.user,
  isTyping = false,
  time
}) => {
  const { theme } = useTheme();
  return (
    <div className="w-full flex items-center justify-left gap-8px pb-3 border-b border-gray-900 dark:border-gray-300 rounded-sm cursor-pointer">
      <div className="relative w-32px h-32px rounded-full border border-gray-900 dark:border-gray-300 flex items-center justify-center">
        <Icon
          icon={avatar}
          iconSize="32px"
          iconColor={theme === "dark" ? "#E0E0E0" : "#000"}
        />
        <div className="absolute bottom-0 right-0 rounded-full border border-white w-3 h-3 bg-green-500"></div>
      </div>
      <div className="flex flex-col w-full gap-1">
        <div className="flex justify-between w-full items-center">
          <h4 className="font-medium text-l text-gray-900 dark:text-gray-300">
            {userName}
          </h4>
          <span className="text-s text-gray-700 dark:text-gray-400">
            {time}
          </span>
        </div>
        <div className="flex justify-between w-full items-center">
          <h4
            className={clsx("text-l text-gray-600 dark:text-gray-200", {
              "text-green-500 dark:text-green-500": isTyping,
            })}
          >
            {isTyping ? "... is typing" : message}
          </h4>
          <span className="text-s text-gray-700 dark:text-gray-400">
            <Icon
              icon={
                status === "readed"
                  ? ICON_COLLECTION.readIcon
                  : ICON_COLLECTION.sendIcon
              }
              iconSize="12px"
              iconColor={"#27AE60"}
            />
          </span>
        </div>
      </div>
    </div>
  );
};
