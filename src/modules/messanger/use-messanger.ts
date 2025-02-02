import { chatsApi } from "@/app/services/chatsApi";
import { userApi } from "@/app/services/userApi";
import { setUser } from "@/app/store/reducers/UserSlice";
import { IChat } from "@/shared/types/user-api-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useMessanger = () => {
  const dispatch = useDispatch();
  const { data: user, isLoading: isUserLoading } = userApi.useGetCurrentUserQuery("");
  const { data: userChats, isLoading: isChatsLoading } = chatsApi.useGetAllUserChatsQuery("");
  const [selectedChat, setSelectedChat] = useState<IChat>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (user && !isUserLoading) {
      dispatch(setUser(user));

      if (user.themeMode) {
        localStorage.setItem("themeMode", user.themeMode);
      }
    }
  }, [user, dispatch, isUserLoading]);

  const handleSelectChat = (chatId) => {
    const chatToFind = userChats && userChats[chatId];
    setSelectedChat(chatToFind);
    setIsSidebarOpen(false)
  };

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  }

  return {
    models: {
      user,
      userChats,
      selectedChatId: selectedChat?.last_message.chat_id,
      isChatsLoading,
      isSidebarOpen,
    },
    commands: {
      handleSelectChat,
      handleOpenSidebar,
    },
  };
};
