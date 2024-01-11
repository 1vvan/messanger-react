import React from "react";
import { Status, UserRow } from "@/UI/user-row/user-row";
import styles from "./chats-list.module.scss";
import { Icon } from "@/UI/icon/icon";
import { ICON_COLLECTION } from "@/UI/icon/icon-list";
import Select from "react-select";

const chats = [
  {
    id: 1,
    name: "John Doe",
    status: "readed" as Status,
    time: "16:45",
    message: "How are you doing?",
    isTyping: false,
  },
  {
    id: 2,
    name: "Travis Barker",
    status: "readed" as Status,
    time: "8:15",
    message: "",
    isTyping: true,
  },
  {
    id: 3,
    name: "Kate Rose",
    status: "sended" as Status,
    time: "12:45",
    message: "you: See you tomorrow!",
    isTyping: false,
  },
];

const sortOptions = [
  { value: "time", label: "Newest" },
  { value: "name", label: "Name" },
];

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
    overflow: 'hidden'
  }),
  menuList: (base) => ({
    ...base,
    padding: "0px",
    margin: "0px",
  }),
};

export const ChatsList = () => {
  return (
    <div className={styles["sidebar__chats"]}>
      <h1>Messages</h1>
      <div className={styles["sidebar__chats_search"]}>
        <Icon
          icon={ICON_COLLECTION.search}
          className={styles["sidebar__chats_search-icon"]}
          iconColor="#676767"
        />
        <input type="text" placeholder="Search" />
      </div>
      <div className={styles["sidebar__chats_sort"]}>
        <span>Sort by</span>
        <Select
          options={sortOptions}
          defaultValue={sortOptions[0]}
          styles={selectStyles}
        />
      </div>
      <div className={styles["sidebar__chats_list"]}>
        {chats.map((item) => (
          <UserRow
            key={item.id}
            userName={item.name}
            message={item.message}
            status={item.status}
            time={item.time}
            isTyping={item.isTyping}
          />
        ))}
      </div>
    </div>
  );
};
