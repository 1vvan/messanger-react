import React from "react";
import styles from "./app-layout.module.scss";
import { ToastContainer } from "react-toastify";

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="wrapper">
      <ToastContainer position="bottom-right" />
      <section className={styles["messanger-wrapper"]}>{children}</section>
    </div>
  );
};
