import React from "react";
import { UserRow } from "../user-row/user-row";

export const Sidebar = () => {
  return (
    <section className="fixed top-0 left-0 w-2/12 h-full bg-primary-dark overflow-y-auto">
      <div className="h-full w-full p-24px">
        <UserRow />
        <UserRow />
        <UserRow />
      </div>
    </section>
  );
};
