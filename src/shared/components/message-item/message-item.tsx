import React, { useRef, useState } from "react";
import styles from "./message-item.module.scss";
import { IMessage } from "@/shared/types/user-api-types";
import { formatTime } from "@/shared/helpers/timeFormatter";
import { clsx } from "clsx";
import { BASE_API_URL } from "@/shared/constants/api-url";
import { Icon } from "../icon/icon";
import { ICON_COLLECTION } from "../icon/icon-list";
import { usePopper } from "react-popper";
import FocusTrap from "focus-trap-react";
import { chatsApi } from "@/app/services/chatsApi";
import { toast } from "react-toastify";
import deleteMessageSound from '@/shared/assets/audio/delete-message.mp3'
import { ModalWrapper } from "../modal/modal";
import { Button } from "@mui/material";

interface MessageItemProps {
  message: IMessage;
  avatar: string;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  avatar,
}) => {
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const popperRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [deleteMessage] = chatsApi.useDeleteMessageMutation();
  const { refetch: refetchUserChats } = chatsApi.useGetAllUserChatsQuery("");
  const { refetch: refetchChat } = chatsApi.useGetChatQuery(message.chat_id);
  const [editMessage] = chatsApi.useEditMessageMutation();
  const deleteAudio = new Audio(deleteMessageSound);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editedMessage, setEditedMessage] = useState(message.message)

  const popper = usePopper(popperRef.current, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 5],
        },
      },
    ],
  });

  const handleMessageClick = () => {
    setIsPopperOpen(true);
  };

  const handleCancelClick = () => {
    setIsPopperOpen(false);
    messageRef?.current?.focus();
  };

  const handleDeleteClick = () => {
    deleteMessage(message.id);
    handleCancelClick()

    setTimeout(() => {
      refetchUserChats();
      refetchChat();
      toast.success("Message is deleted");
    }, 1000);
    
    deleteAudio.play()
  }

  const handleEditClick = () => {
    setIsEditModalOpen(true)
    handleCancelClick();
  }

  const handleEditModalConfirm = () => {
    editMessage({ messageId: message.id, message: editedMessage })
    refetchUserChats();
    refetchChat();
    handleEditModalClose()
  }

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditedMessage(message.message)
  }

  return (
    <>
      <div
        className={clsx(styles["message-item"], {
          [styles["message-item--your"]]: message.fromYou,
        })}
        ref={popperRef}
        onClick={handleMessageClick}
      >
        {!message.fromYou && (
          <div className={styles["message-item__avatar"]}>
            <img src={BASE_API_URL + avatar} alt="" />
          </div>
        )}

        <div
          className={styles["message-item__content"]}
          ref={messageRef}
          onClick={handleMessageClick}
        >
          <p className={styles["message-item__content_text"]}>
            {message.message}
          </p>
          <div className={styles["message-item__content_info"]}>
            {message.fromYou && (
              <Icon
                icon={
                  message.read === 0
                    ? ICON_COLLECTION.sendIcon
                    : ICON_COLLECTION.readIcon
                }
                iconColor="#27AE60"
                iconSize="14px"
                hasStroke={false}
              />
            )}
            <span>{formatTime(message.updated_at)}</span>
          </div>
        </div>
      </div>
      {isPopperOpen && (
        <FocusTrap
          active
          focusTrapOptions={{
            initialFocus: false,
            allowOutsideClick: true,
            clickOutsideDeactivates: true,
            onActivate: handleMessageClick,
            onDeactivate: handleCancelClick,
            fallbackFocus: messageRef.current!,
          }}
        >
          <div
            tabIndex={-1}
            className={styles["message-item__popper"]}
            style={popper.styles.popper}
            {...popper.attributes.popper}
            ref={setPopperElement}
            role="dialog"
            aria-label="Message Popper"
          >
            <button
              className={styles["message-item__popper_delete"]}
              onClick={handleDeleteClick}
            >
              Delete message
            </button>
            <button
              className={styles["message-item__popper_edit"]}
              onClick={handleEditClick}
            >
              Edit message
            </button>
          </div>
        </FocusTrap>
      )}
      <ModalWrapper
        setActive={setIsEditModalOpen}
        active={isEditModalOpen}
        title="Edit message"
      >
        <input
          className={styles["edit-modal-input"]}
          type="text"
          value={editedMessage}
          onChange={(e) => setEditedMessage(e.target.value)}
        />
        <div className={styles["edit-modal-buttons"]}>
          <Button
            fullWidth
            variant="outlined"
            color="success"
            onClick={handleEditModalConfirm}
          >
            Save
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={handleEditModalClose}
          >
            Cancel
          </Button>
        </div>
      </ModalWrapper>
    </>
  );
};
