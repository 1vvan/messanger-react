import React from "react";
import { Sidebar } from "../components/sidebar/Sidebar";
import styles from "./app-layout.module.scss";

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="wrapper">
      <Sidebar />
      <section className={styles["messanger-wrapper"]}>{children}</section>
    </div>
  );
};
