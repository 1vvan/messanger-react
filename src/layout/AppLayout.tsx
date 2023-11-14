import React from "react";
import { Sidebar } from "../components/sidebar/Sidebar";

export const AppLayout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <div>
          <Sidebar />
          <div>
              {children}
          </div>
    </div>
  );
};