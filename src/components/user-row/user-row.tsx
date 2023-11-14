import { Icon } from "@/UI/icon/icon";
import { ICON_COLLECTION } from "@/UI/icon/icon-list";
import React from "react";

export const UserRow = () => {
  return (
    <div className="w-full flex items-center justify-left gap-8px pb-3 border-b border-slate-400 rounded-sm cursor-pointer">
      <div className="w-32px h-32px rounded-full border border-gray-300 flex items-center justify-center">
        <Icon icon={ICON_COLLECTION.user} iconSize="32px" iconColor="#E0E0E0" />
      </div>
      <h4 className="font-medium text-l text-gray-300">User Name</h4>
    </div>
  );
};
