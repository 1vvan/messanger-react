import React from "react";
import { AppLayout } from "../../app/layout/AppLayout";
import styles from "./messanger-page.module.scss";
import { ChatWindow } from "./components/chat-window/ChatWindow";
import { Sidebar } from "./components/sidebar/Sidebar";
import { useMessanger } from "./use-messanger";

export const MessangerPage = () => {
  
  const { models, commands } = useMessanger();
  
  return (
    <AppLayout>
      <Sidebar
        userAvatar={models.user?.photo}
        userChats={models.userChats && models.userChats}
        isChatsLoading={models.isChatsLoading}
        handleSelectChat={commands.handleSelectChat}
      />
      <section className={styles["messanger"]}>
        {!!models.selectedChat ? (
          <ChatWindow />
        ) : (
          <h3 className={styles["messanger__empty"]}>Choose Chat</h3>
        )}
      </section>
    </AppLayout>
  );
};
