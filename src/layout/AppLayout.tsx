import React from "react";
import { Sidebar } from "../components/sidebar/Sidebar";

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative h-screen">
      <Sidebar />
      <section className="absolute top-0 right-0 w-10/12 h-full p-24px bg-secondary-dark">
        {children}
      </section>
    </div>
  );
};
