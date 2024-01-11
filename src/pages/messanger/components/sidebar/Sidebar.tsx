import React, { useEffect, useState } from "react";
import { ICON_COLLECTION } from "@/UI/icon/icon-list";
import { Icon } from "@/UI/icon/icon";
import { ModalWrapper } from "../../../../components/modal/modal";
import Switch from "react-switch";
import { RowContainer } from "@/UI/row-container/row-container";
import { useMode } from "../../../../theme-context/theme-context";
import styles from "./sidebar.module.scss";
import { Avatar } from "@mui/material";
import { themeColorsInit } from "@/assets/scss/variables/variables";
import { logout } from "@/pages/auth/login/use-login";
import { ChatsList } from "../chats-list/ChatsList";
import { clsx } from 'clsx';

const menu = [
  { id: 1, icon: ICON_COLLECTION.planet },
  { id: 2, icon: ICON_COLLECTION.chat },
  { id: 3, icon: ICON_COLLECTION.video },
  { id: 4, icon: ICON_COLLECTION.music },
  { id: 5, icon: ICON_COLLECTION.date },
];

export const Sidebar = () => {
  const [activeModal, setActiveModal] = useState(false);
  const { theme, toggleColorMode, mode } = useMode();
  const [selectedMenuItem, setSelectedMenuItem] = useState<number>(2)

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
            <Avatar alt="User" sx={{ width: 32, height: 32 }} />
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
        <ChatsList />
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
