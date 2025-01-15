import React from "react";
import { UserRow } from "@/shared/components/user-row/user-row";
import styles from "./chats-list.module.scss";
import { Icon } from "@/shared/components/icon/icon";
import { ICON_COLLECTION } from "@/shared/components/icon/icon-list";
import Select from "react-select";
import { IChat } from "@/shared/types/user-api-types";
import { formatTime } from "@/shared/helpers/timeFormatter";
import { CircularProgress } from "@mui/material";

const selectStyles = {
  control: (base) => ({
    ...base,
    border: "0 !important",
    boxShadow: "0 !important",
    background: "transparent",
    minHeight: "16px",
    "&:hover": {
      border: "0 !important",
    },
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#2D9CDB",
    fontSize: "14px",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: "0px",
    marginLeft: "4px",
    color: "#2D9CDB",
    width: "13px",
    cursor: "pointer",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0px",
    cursor: "pointer",
  }),
  option: (base) => ({
    ...base,
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    minWidth: "70px",
    margin: "0",
    overflow: "hidden",
  }),
  menuList: (base) => ({
    ...base,
    padding: "0px",
    margin: "0px",
  }),
};

interface ChatsListProps {
  chats: IChat[];
  isChatsLoading: boolean;
  handleSelectChat: (chatId) => void;
  selectedChatId: number | undefined;
  sortSelectOptions: { value: string; label: string }[];
  handleSortOptionChange: (option) => void;
  searchText: string;
  handleSearchChange: (e) => void;
  searchedChats: IChat[];
  isSearchLoading: boolean;
}

export const ChatsList: React.FC<ChatsListProps> = ({
  chats,
  isChatsLoading,
  handleSelectChat,
  selectedChatId,
  sortSelectOptions,
  handleSortOptionChange,
  searchText,
  handleSearchChange,
  searchedChats,
  isSearchLoading,
}) => {
  return (
    <div className={styles["sidebar__chats"]}>
      <h1>Messages</h1>
      <div className={styles["sidebar__chats_search"]}>
        <Icon
          icon={ICON_COLLECTION.search}
          className={styles["sidebar__chats_search-icon"]}
          iconColor="#676767"
        />
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearchChange}
          value={searchText}
        />
        {isSearchLoading && (
          <div className={styles["sidebar__chats_search-loader"]}>
            <CircularProgress size={16} />
          </div>
        )}
      </div>
      <div className={styles["sidebar__chats_sort"]}>
        <span>Sort by</span>
        <Select
          options={sortSelectOptions}
          defaultValue={sortSelectOptions[0]}
          styles={selectStyles}
          onChange={(selectedOption) => handleSortOptionChange(selectedOption)}
        />
      </div>
      <div className={styles["sidebar__chats_list"]}>
        {searchedChats && searchText
          ? searchedChats.map((chat) => (
              <UserRow
                key={chat.last_message.chat_id}
                id={chat.last_message.chat_id}
                userName={chat.name}
                message={chat.last_message.message}
                status={"readed"}
                time={formatTime(chat.last_message.updated_at)}
                avatar={chat.avatar}
                isChatLoading={isChatsLoading}
                isCurrentChatSelected={
                  selectedChatId === chat.last_message.chat_id
                }
                handleSelectChat={handleSelectChat}
                unreadCount={chat.unread_count}
                isMuted={chat.muted === 1}
              />
            ))
          : chats.map((chat) => (
              <UserRow
                key={chat.last_message.chat_id}
                id={chat.last_message.chat_id}
                userName={chat.name}
                message={chat.last_message.message}
                status={"readed"}
                time={formatTime(chat.last_message.updated_at)}
                avatar={chat.avatar}
                isChatLoading={isChatsLoading}
                handleSelectChat={handleSelectChat}
                isCurrentChatSelected={
                  selectedChatId === chat.last_message.chat_id
                }
                unreadCount={chat.unread_count}
                isMuted={chat.muted === 1}
              />
            ))}
      </div>
    </div>
  );
};
