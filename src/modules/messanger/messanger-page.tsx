import React from "react";
import { AppLayout } from "../../app/layout/AppLayout";
import styles from "./messanger-page.module.scss";
import { ChatWindow } from "./components/chat-window/ChatWindow";
import { Sidebar } from "../sidebar/Sidebar";
import { useMessanger } from "./use-messanger";

export const MessangerPage = () => {
  const { models, commands } = useMessanger();

  return (
    <AppLayout>
      <Sidebar
        user={models.user}
        userChats={models.userChats && models.userChats}
        isChatsLoading={models.isChatsLoading}
        selectedChatId={models.selectedChatId}
        isSidebarOpen={models.isSidebarOpen}
        handleSelectChat={commands.handleSelectChat}
      />
      <section className={styles["messanger"]}>
        {!!models.selectedChatId ? (
          <ChatWindow
            chatId={models.selectedChatId}
            handleOpenSidebar={commands.handleOpenSidebar}
          />
        ) : (
          <h3 className={styles["messanger__empty"]}>Choose Chat</h3>
        )}
      </section>
    </AppLayout>
  );
};
