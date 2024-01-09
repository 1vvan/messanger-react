import React, { useState } from "react";
import { UserRow } from "../user-row/user-row";
import { ICON_COLLECTION } from "@/UI/icon/icon-list";
import { Icon } from "@/UI/icon/icon";
import { ModalWrapper } from "../modal/modal";
import Switch from "react-switch";
import { useTheme } from "../theme-context/theme-context";
import { RowContainer } from "@/UI/row-container/row-container";

export const Sidebar = () => {
  const [activeModal, setActiveModal] = useState(false);
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <section className="fixed z-10 top-0 left-0 w-3/12 h-full flex justify-center">
        <div className="w-2/12 flex flex-col justify-between items-center p-24px bg-secondary-light dark:bg-secondary-dark">
          <div className="flex flex-col gap-4">
            <Icon
              icon={ICON_COLLECTION.logo}
              iconSize="32px"
              iconColor={"#27AE60"}
            />
            <Icon
              icon={ICON_COLLECTION.user}
              iconSize="32px"
              iconColor={theme === "dark" ? "#E0E0E0" : "#000"}
              className=" pt-1"
            />
            <span className="mt-3 h-px w-full bg-slate-300"></span>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <button
              className="flex items-center justify-center"
              onClick={() => setActiveModal(true)}
            >
              <Icon
                icon={ICON_COLLECTION.settings}
                iconSize="32px"
                iconColor={theme === "dark" ? "#E0E0E0" : "#000"}
                hoverColor="#B3B3B3"
              />
            </button>
            <button className="flex items-center justify-center">
              <Icon
                icon={ICON_COLLECTION.logout}
                iconSize="32px"
                iconColor={theme === "dark" ? "#E0E0E0" : "#000"}
              />
            </button>
          </div>
        </div>
        <div className="w-10/12 p-24px bg-primary-light dark:bg-primary-dark overflow-y-auto">
          <div className="w-full flex mb-32px justify-between items-center">
            <h1 className="text-3xl text-gray-900 dark:text-gray-300">
              Messages
            </h1>
          </div>
          <div className="w-full flex flex-col gap-24px">
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
      <ModalWrapper active={activeModal} setActive={setActiveModal}>
        <RowContainer label="Dark Mode">
          <Switch
            onChange={toggleTheme}
            checked={theme === "light" ? false : true}
            uncheckedIcon={false}
            checkedIcon={false}
          />
        </RowContainer>
      </ModalWrapper>
    </>
  );
};
