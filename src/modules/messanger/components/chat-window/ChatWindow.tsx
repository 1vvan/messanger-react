import React from "react";
import styles from './chat-window.module.scss'
import { ChatTopBar } from "../chat-top-bar/chat-top-bar";
import { useChatWindow } from "./use-chat-window";
import { ChatBottom } from "../chat-bottom/chat-bottom";
import { ChatMain } from "../chat-main/chat-main";
import { ModalWrapper } from "@/shared/components/modal/modal";
import { RowContainer } from "@/shared/components/row-container/row-container";
import Switch from "react-switch";

interface ChatWindowProps {
  chatId: number;
  handleOpenSidebar: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  chatId,
  handleOpenSidebar,
}) => {
  const { models, commands } = useChatWindow({ chatId: chatId });
  return (
    <div className={styles["chat-window"]}>
      <ChatTopBar
        chat={models.chat}
        setIsModalActive={commands.setIsChatModalActive}
        handleOpenSidebar={handleOpenSidebar}
      />
      <ChatMain chat={models.chat} chatIsLoading={models.chatIsLoading} />
      <ChatBottom
        message={models.message}
        handleChangeMessage={commands.handleChangeMessage}
        handleSendMessage={commands.handleSendMessage}
      />
      <ModalWrapper
        active={models.isChatModalActive}
        setActive={commands.setIsChatModalActive}
        title="Chat Settings"
      >
        <RowContainer label="Mute Chat">
          <Switch
            onChange={commands.handleChangeChatMute}
            checked={models.isChatMuted}
            uncheckedIcon={false}
            checkedIcon={false}
          />
        </RowContainer>
      </ModalWrapper>
    </div>
  );
};