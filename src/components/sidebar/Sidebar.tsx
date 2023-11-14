import React, { useState } from "react";
import { UserRow } from "../user-row/user-row";
import { ICON_COLLECTION } from "@/UI/icon/icon-list";
import { Icon } from "@/UI/icon/icon";
import { ModalWrapper } from "../modal/modal";

export const Sidebar = () => {
    const [activeModal, setActiveModal] = useState(false)
    console.log(activeModal);
    
    return (
      <>
        <section className="fixed z-10 top-0 left-0 w-2/12 p-24px h-full bg-primary-dark overflow-y-auto">
          <div className="w-full flex mb-32px justify-between items-center">
            <h4 className="font-medium text-l text-gray-300">Messanger</h4>
            <button
              className="flex items-center justify-center"
              onClick={() => setActiveModal(true)}
            >
              <Icon
                icon={ICON_COLLECTION.settings}
                iconSize="32px"
                iconColor="#E0E0E0"
              />
            </button>
          </div>
          <div className="w-full flex flex-col gap-24px">
            <UserRow />
            <UserRow />
            <UserRow />
          </div>
        </section>
            <ModalWrapper active={activeModal} setActive={setActiveModal}>
                jknsfjkns
                svvsvsdv
                Svdsdvsv
        </ModalWrapper>
      </>
    );
};
