import React, { useEffect, useState } from "react";
import { ICON_COLLECTION } from "@/shared/components/icon/icon-list";
import { Icon } from "@/shared/components/icon/icon";
import { ModalWrapper } from "../../../../shared/components/modal/modal";
import Switch from "react-switch";
import { RowContainer } from "@/shared/components/row-container/row-container";
import { useMode } from "../../../../shared/theme-context/theme-context";
import styles from "./sidebar.module.scss";
import { themeColorsInit } from "@/shared/assets/scss/variables/variables";
import { logout } from "@/modules/auth/login/use-login";
import { ChatsList } from "../chats-list/ChatsList";
import { clsx } from "clsx";
import { BASE_API_IMG_URL } from "@/shared/constants/api-url";
import { ChatsResponse } from "@/shared/types/user-api-types";
import { handleImageError } from "@/shared/helpers/imageError";
import { CircularProgress } from "@mui/material";

const menu = [
  { id: 1, icon: ICON_COLLECTION.planet },
  { id: 2, icon: ICON_COLLECTION.chat },
  { id: 3, icon: ICON_COLLECTION.video },
  { id: 4, icon: ICON_COLLECTION.music },
  { id: 5, icon: ICON_COLLECTION.date },
];

interface SidebarProps {
  userAvatar: string | undefined;
  userChats: ChatsResponse | undefined;
  isChatsLoading: boolean;
  handleSelectChat: (chatId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  userAvatar,
  userChats,
  isChatsLoading,
  handleSelectChat,
}) => {
  const [activeModal, setActiveModal] = useState(false);
  const { theme, toggleColorMode, mode } = useMode();
  const [selectedMenuItem, setSelectedMenuItem] = useState<number>(2);

  useEffect(() => {
    themeColorsInit(theme);
  }, [theme]);
  return (
    <>
      <section className={styles["sidebar"]}>
        <div className={styles["sidebar__left"]}>
          <div className={styles["sidebar__left_icons"]}>
            <Icon
              icon={ICON_COLLECTION.logo}
              iconSize="32px"
              iconColor={"#27AE60"}
            />
            {userAvatar ? (
              <div className={styles["sidebar__left_icons-avatar"]}>
                <img
                  src={BASE_API_IMG_URL + userAvatar}
                  alt="User"
                  onError={handleImageError}
                />
              </div>
            ) : (
              <CircularProgress size={32} />
            )}
            <span className={styles["sidebar__left_icons-line"]}></span>
          </div>
          <div className={styles["sidebar__left_menu"]}>
            {menu.map((item) => (
              <div
                className={clsx(styles["sidebar__left_menu-item"], {
                  [styles["sidebar__left_menu-item--active"]]:
                    selectedMenuItem === item.id,
                })}
                onClick={() => setSelectedMenuItem(item.id)}
                key={item.id}
              >
                <Icon
                  icon={item.icon}
                  key={item.id}
                  iconSize="24px"
                  iconColor={selectedMenuItem === item.id ? "#fff" : "#27AE60"}
                  hasStroke={false}
                />
              </div>
            ))}
          </div>
          <div className={styles["sidebar__left_settings"]}>
            <button onClick={() => setActiveModal(true)}>
              <Icon
                icon={ICON_COLLECTION.settings}
                iconSize="32px"
                iconColor={mode === "light" ? "#0000004A" : "#FFF"}
                hoverColor="#B3B3B3"
              />
            </button>
            <button onClick={logout}>
              <Icon
                icon={ICON_COLLECTION.logout}
                iconSize="32px"
                iconColor={mode === "light" ? "#0000004A" : "#FFF"}
                hoverColor="#B3B3B3"
              />
            </button>
          </div>
        </div>
        <ChatsList
          chats={userChats}
          handleSelectChat={handleSelectChat}
          isChatsLoading={isChatsLoading}
        />
      </section>
      <ModalWrapper
        active={activeModal}
        setActive={setActiveModal}
        title="Settings"
      >
        <RowContainer label="Dark Mode">
          <Switch
            onChange={toggleColorMode}
            checked={mode === "dark" ? true : false}
            uncheckedIcon={false}
            checkedIcon={false}
          />
        </RowContainer>
      </ModalWrapper>
    </>
  );
};
