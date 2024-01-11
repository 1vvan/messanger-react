import React from "react";
import { AppLayout } from "../../layout/AppLayout";
import styles from "./messanger-page.module.scss";
import { ChatWindow } from "./components/chat-window/ChatWindow";

export const MessangerPage = () => {
  const isSelectedUser = false;

  if (isSelectedUser) {
    return (
      <AppLayout>
        <section className={styles["messanger"]}>
          <h3 className={styles["messanger__empty"]}>Choose Chat</h3>
        </section>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <section className={styles["messanger"]}>
        <ChatWindow/>
      </section>
    </AppLayout>
  );
};
