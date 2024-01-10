import React from "react";
import { AppLayout } from "../../layout/AppLayout";
import styles from './messanger-page.module.scss'

export const MessangerPage = () => {
  return (
    <AppLayout>
      <section
        className={styles['messanger']}
      >
        <h3>
          Choose Chat
        </h3>
      </section>
    </AppLayout>
  );
};
