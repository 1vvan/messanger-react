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
import { ChatsResponse, IAccountSettings } from "@/shared/types/user-api-types";
import { handleImageError } from "@/shared/helpers/imageError";
import { Button, CircularProgress } from "@mui/material";
import { IUser } from "@/shared/types/IUser";
import { AccountSettingsModalForm } from "../account-settings-modal-form/account-settings-modal-form";
import { accountSettingsSchema } from "@/shared/schemas/accountSettingsSchema";
import { useUpdateUserMutation } from "@/app/services/userApi";
import { toast } from "react-toastify";

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
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  userChats,
  isChatsLoading,
  handleSelectChat,
}) => {
  const [activeModal, setActiveModal] = useState(false);
  const { theme, toggleColorMode, mode } = useMode();
  const [selectedMenuItem, setSelectedMenuItem] = useState<number>(2);
  const [isUpdateUser, setIsUpdateUser] = useState(true);
  const [settingsFormData, setSettingFormData] = useState<IAccountSettings>({
    nickname: "",
  });
  const [formDataErorrs, setFormDataErorrs] = useState<IAccountSettings>({
    nickname: "",
  });
  const [updateUser, {data}] = useUpdateUserMutation()

  useEffect(() => {
    if (user?.nickname) {
      setSettingFormData({
        nickname: user?.nickname,
      });
    }
  }, [user?.nickname]);

  const validateForm = async () => {
    try {
      await accountSettingsSchema.validate(settingsFormData, {
        abortEarly: false,
      });
      return true;
    } catch (error: any) {
      const validationErrors = { nickname: "" };
      error.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setFormDataErorrs(validationErrors);
      return false;
    }
  }

  const handleChangeFormData = (key, value) => {
    setSettingFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleConfirmUpdateAccount =  async (e) => {
    e.preventDefault();
    if (await validateForm()) {
      if (user?.id) {
        updateUser({userId: user.id, data: settingsFormData});
      }
      if (data) {
        setSettingFormData({
          nickname: data?.nickname
        });
      }
      toast.success('Update account successfully')
    }
  }

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
            {user?.photo ? (
              <div className={styles["sidebar__left_icons-avatar"]}>
                <img
                  src={BASE_API_IMG_URL + user?.photo}
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
        title={isUpdateUser ? "Account Settings" : "Settings"}
      >
        {!isUpdateUser ? (
          <>
            <RowContainer label="Dark Mode">
              <Switch
                onChange={toggleColorMode}
                checked={mode === "dark" ? true : false}
                uncheckedIcon={false}
                checkedIcon={false}
              />
            </RowContainer>
            <Button variant="outlined" onClick={() => setIsUpdateUser(true)}>
              Account Settings
            </Button>
          </>
        ) : (
          <>
            <AccountSettingsModalForm
              settingsFormData={settingsFormData}
              formDataErorrs={formDataErorrs}
              handleChangeFormData={handleChangeFormData}
              handleConfirmUpdateAccount={handleConfirmUpdateAccount}
            />
            <div className={styles["account-setting-form-buttons"]}>
              <Button
                fullWidth
                variant="outlined"
                color="success"
                onClick={handleConfirmUpdateAccount}
              >
                Save
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={() => setIsUpdateUser(false)}
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
