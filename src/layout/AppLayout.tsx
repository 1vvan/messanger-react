import React from "react";
import { Sidebar } from "../components/sidebar/Sidebar";

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative h-screen">
      <Sidebar/>
      <section
        className="fixed z-10 top-0 right-0 w-9/12 h-full p-24px bg-secondary-light dark:bg-secondary-dark overflow-y-auto"
      >
        {children}
      </section>
    </div>
  );
};
