import React, { useEffect, useState } from "react";
import { UserRow } from "../../UI/user-row/user-row";
import { ICON_COLLECTION } from "@/UI/icon/icon-list";
import { Icon } from "@/UI/icon/icon";
import { ModalWrapper } from "../modal/modal";
import Switch from "react-switch";
import { RowContainer } from "@/UI/row-container/row-container";
import { useMode } from "../../theme-context/theme-context";
import styles from "./sidebar.module.scss";
import { Avatar } from "@mui/material";
import { themeColorsInit } from "@/assets/scss/variables/variables";
import { logout } from "@/pages/auth/login/use-login";

export const Sidebar = () => {
  const [activeModal, setActiveModal] = useState(false);
  const { theme, toggleColorMode, mode } = useMode();

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
        <div className={styles["sidebar__chats"]}>
          <h1>Messages</h1>
          <div className={styles["sidebar__chats_list"]}>
            <UserRow
              userName="John Doe"
              message="How are you doing?"
              status="readed"
              time="16:45"
            />
            <UserRow
              userName="Travis Barker"
              message=""
              status="readed"
              isTyping={true}
              time="8:15"
            />
            <UserRow
              userName="Kate Rose"
              message="you: See you tomorrow!"
              status="sended"
              time="12:45"
            />
          </div>
        </div>
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
