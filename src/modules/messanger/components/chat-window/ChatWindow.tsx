import React from "react";
import styles from './chat-window.module.scss'
import { ChatTopBar } from "../chat-top-bar/chat-top-bar";

export const ChatWindow = () => {
    return (
        <div className={styles['chat-window']}>
            <ChatTopBar/>
        </div>
    )
}