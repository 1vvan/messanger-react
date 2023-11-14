import React from "react";
import styles from "./modal.module.scss";
import clsx from "clsx";
import { Icon } from "@/UI/icon/icon";
import { ICON_COLLECTION } from "@/UI/icon/icon-list";
import { useTheme } from "../theme-context/theme-context";

interface ModalProps {
  active: boolean;
  setActive: (boolean) => void;
}

export const ModalWrapper: React.FC<React.PropsWithChildren<ModalProps>> = ({
  active,
  setActive,
  children,
}) => {
  const {theme} = useTheme()
  return (
    <div
      className={clsx(styles["modal"], {
        [styles["modal-active"]]: active,
      })}
      onClick={() => setActive(false)}
    >
      <div
        className={clsx(
          styles["modal__content"],
          "bg-white dark:bg-dark-blue",
          {
            [styles["modal__content-active"]]: active,
          }
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={clsx(styles["modal__header"])}>
          <h4 className="font-medium text-l text-gray-900 dark:text-gray-300">
            Settings
          </h4>
          <button
            onClick={() => setActive(false)}
            className="flex items-center justify-center"
          >
            <Icon
              icon={ICON_COLLECTION.cross}
              iconSize="32px"
              iconColor={theme === "dark" ? "#E0E0E0" : "#000"}
              hoverColor="#B3B3B3"
            />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
