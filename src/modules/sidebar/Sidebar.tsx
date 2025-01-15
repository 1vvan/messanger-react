import React, { useEffect } from "react";
import { ICON_COLLECTION } from "@/shared/components/icon/icon-list";
import { Icon } from "@/shared/components/icon/icon";
import { ModalWrapper } from "../../shared/components/modal/modal";
import Switch from "react-switch";
import { RowContainer } from "@/shared/components/row-container/row-container";
import { useMode } from "../../shared/theme-context/theme-context";
import styles from "./sidebar.module.scss";
import { themeColorsInit } from "@/shared/assets/scss/variables/variables";
import { logout } from "@/modules/auth/login/use-login";
import { ChatsList } from "./components/chats-list/ChatsList";
import { clsx } from "clsx";
import { BASE_API_URL } from "@/shared/constants/api-url";
import { ChatsResponse } from "@/shared/types/user-api-types";
import { handleImageError } from "@/shared/helpers/imageError";
import { Button, CircularProgress } from "@mui/material";
import { IUser } from "@/shared/types/IUser";
import { AccountSettingsModalForm } from "./components/account-settings-modal-form/account-settings-modal-form";
import { useSidebar } from "./use-sidebar";

const menu = [
  { id: 1, icon: ICON_COLLECTION.planet },
  { id: 2, icon: ICON_COLLECTION.chat },
  { id: 3, icon: ICON_COLLECTION.video },
  { id: 4, icon: ICON_COLLECTION.music },
  { id: 5, icon: ICON_COLLECTION.date },
];

interface SidebarProps {
  user: IUser | undefined;
  userChats: ChatsResponse | undefined;
  isChatsLoading: boolean;
  handleSelectChat: (chatId) => void;
  selectedChatId: number | undefined;
  isSidebarOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  userChats,
  isChatsLoading,
  handleSelectChat,
  selectedChatId,
  isSidebarOpen,
}) => {
  const { models, commands } = useSidebar({
    user,
    userChats,
  });
  const { theme, toggleColorMode, mode } = useMode();
  useEffect(() => {
    themeColorsInit(theme);
  }, [theme]);

  return (
    <>
      <section
        className={clsx(styles["sidebar"], {
          [styles["sidebar--open"]]: isSidebarOpen,
        })}
      >
        <div className={styles["sidebar__left"]}>
          <div className={styles["sidebar__left_icons"]}>
            <Icon
              icon={ICON_COLLECTION.logo}
              iconSize="32px"
              iconColor={"#27AE60"}
            />
            {user?.profilePicture ? (
              <div className={styles["sidebar__left_icons-avatar"]}>
                <img
                  src={BASE_API_URL + user?.profilePicture}
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
                    models.selectedMenuItem === item.id,
                })}
                onClick={() => commands.setSelectedMenuItem(item.id)}
                key={item.id}
              >
                <Icon
                  icon={item.icon}
                  key={item.id}
                  iconSize="24px"
                  iconColor={
                    models.selectedMenuItem === item.id ? "#fff" : "#27AE60"
                  }
                  hasStroke={false}
                />
              </div>
            ))}
          </div>
          <div className={styles["sidebar__left_settings"]}>
            <button onClick={() => commands.setActiveModal(true)}>
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
          chats={models.sortedChatsArray}
          handleSelectChat={handleSelectChat}
          selectedChatId={selectedChatId}
          isChatsLoading={isChatsLoading}
          sortSelectOptions={models.sortSelectOptions}
          handleSortOptionChange={commands.handleSortOptionChange}
          handleSearchChange={commands.handleSearchChange}
          searchText={models.searchText}
          searchedChats={models.searchedChats}
          isSearchLoading={models.searchLoading}
        />
      </section>
      <ModalWrapper
        active={models.activeModal}
        setActive={commands.setActiveModal}
        title={models.isUpdateUser ? "Account Settings" : "Settings"}
      >
        {!models.isUpdateUser ? (
          <>
            <RowContainer label="Dark Mode">
              <Switch
                onChange={toggleColorMode}
                checked={mode === "dark" ? true : false}
                uncheckedIcon={false}
                checkedIcon={false}
              />
            </RowContainer>
            <Button
              variant="outlined"
              onClick={() => commands.setIsUpdateUser(true)}
            >
              Account Settings
            </Button>
          </>
        ) : (
          <>
            <AccountSettingsModalForm
              settingsFormData={models.settingsFormData}
              formDataErorrs={models.formDataErorrs}
              handleChangeFormData={commands.handleChangeFormData}
              handleFileChange={commands.handleFileChange}
              handleConfirmUpdateAccount={commands.handleConfirmUpdateAccount}
            />
            <div className={styles["account-setting-form-buttons"]}>
              <Button
                fullWidth
                variant="outlined"
                color="success"
                onClick={commands.handleConfirmUpdateAccount}
              >
                Save
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={commands.handleCancelUpdate}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </ModalWrapper>
    </>
  );
};
