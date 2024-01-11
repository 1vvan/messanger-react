import React from "react";
import { Backdrop, Fade, Modal } from "@mui/material";
import styles from "./modal.module.scss";
import { Icon } from "@/shared/components/icon/icon";
import { ICON_COLLECTION } from "@/shared/components/icon/icon-list";

interface ModalProps {
  active: boolean;
  setActive: (boolean) => void;
  title?: string;
}

export const ModalWrapper: React.FC<React.PropsWithChildren<ModalProps>> = ({
  active,
  setActive,
  title,
  children,
}) => {
  const handleClose = () => setActive(false);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={active}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={active}>
        <div className={styles["modal__box"]}>
          <div className={styles["modal__header"]}>
            <h4>{title}</h4>
            <button onClick={handleClose}>
              <Icon icon={ICON_COLLECTION.cross} iconSize="32px" />
            </button>
          </div>
          {children}
        </div>
      </Fade>
    </Modal>
  );
};
