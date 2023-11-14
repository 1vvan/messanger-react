import { Icon } from "@/UI/icon/icon";
import { ICON_COLLECTION } from "@/UI/icon/icon-list";
import React from "react";
import { useTheme } from "../theme-context/theme-context";

export const UserRow = () => {
  const {theme} = useTheme()
  return (
    <div className="w-full flex items-center justify-left gap-8px pb-3 border-b border-gray-900 dark:border-gray-300 rounded-sm cursor-pointer">
      <div className="w-32px h-32px rounded-full border border-gray-900 dark:border-gray-300 flex items-center justify-center">
        <Icon
          icon={ICON_COLLECTION.user}
          iconSize="32px"
          iconColor={theme === "dark" ? "#E0E0E0" : "#000"}
        />
      </div>
      <h4 className="font-medium text-l text-gray-900 dark:text-gray-300">
        User Name
      </h4>
    </div>
  );
};
