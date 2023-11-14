import React from "react";
import styles from "./modal.module.scss";
import clsx from "clsx";

interface ModalProps {
    active: boolean
    setActive: (boolean) => void
}

export const ModalWrapper: React.FC<React.PropsWithChildren<ModalProps>> = ({
  active,
  setActive,
  children,
}) => {
  return (
    <div
      className={clsx(styles["modal"], {
        [styles["modal-active"]]: active,
      })}
      onClick={() => setActive(false)}
    >
      <div
        className={clsx(styles["modal__content"], {
          [styles["modal__content-active"]]: active,
        })}
        onClick={(e) => e.stopPropagation}
      >
        {children}
      </div>
    </div>
  );
};
