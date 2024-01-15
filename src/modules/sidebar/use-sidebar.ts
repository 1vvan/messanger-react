import { useUpdateUserMutation } from "@/app/services/userApi";
import { accountSettingsSchema } from "@/shared/schemas/accountSettingsSchema";
import { IAccountSettings, IChat } from "@/shared/types/user-api-types";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const sortSelectOptions = [
  { value: "time", label: "Newest" },
  { value: "name", label: "Name" },
];

export const useSidebar = ({ user, userChats }) => {
  const [activeModal, setActiveModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<number>(2);
  const [isUpdateUser, setIsUpdateUser] = useState(false);
  const [settingsFormData, setSettingFormData] = useState<IAccountSettings>({
    nickname: "",
  });
  const [formDataErorrs, setFormDataErorrs] = useState<IAccountSettings>({
    nickname: "",
  });
  const [updateUser, { data }] = useUpdateUserMutation();
  const [selectedSortOption, setSelectedSortOption] = useState("time");
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (user?.nickname) {
      setSettingFormData({
        nickname: user?.nickname,
      });
    }
  }, [user?.nickname]);

  const validateForm = async () => {
    try {
      await accountSettingsSchema.validate(settingsFormData, {
        abortEarly: false,
      });
      return true;
    } catch (error: any) {
      const validationErrors = { nickname: "" };
      error.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setFormDataErorrs(validationErrors);
      return false;
    }
  };

  const handleChangeFormData = (key, value) => {
    setSettingFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleConfirmUpdateAccount = async (e) => {
    e.preventDefault();
    if (await validateForm()) {
      if (user?.id) {
        updateUser({ userId: user.id, data: settingsFormData });
      }
      if (data) {
        setSettingFormData({
          nickname: data?.nickname,
        });
      }
      toast.success("Update account successfully");
    }
  };

  const handleCancelUpdate = () => {
    setSettingFormData({
      nickname: user?.nickname,
    });
    setFormDataErorrs({
      nickname: "",
    });
    setIsUpdateUser(false);
  };

  const handleSortOptionChange = (selectedOption) => {
    setSelectedSortOption(selectedOption.value);
  };

  const chatsArray: IChat[] = useMemo(
    () => (userChats ? Object.values(userChats) : []),
    [userChats]
  );

  const sortedChatsArray = useMemo(() => {
    const copyChatsArray = [...chatsArray];
    if (selectedSortOption === "name") {
      copyChatsArray.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSortOption === "time") {
      copyChatsArray.sort(
        (a, b) =>
          new Date(b.last_message.updated_at).getTime() -
          new Date(a.last_message.updated_at).getTime()
      );
    }
    return copyChatsArray;
  }, [chatsArray, selectedSortOption]);

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  useEffect(() => {
    setSearchLoading(true);
    const timerId = setTimeout(() => {
      setDebouncedSearchText(searchText);
      setSearchLoading(false);
    }, 1500);
    return () => clearTimeout(timerId);
  }, [searchText]);

  const searchedChats = useMemo(() => {
    return (
      chatsArray &&
      chatsArray.filter((chat) =>
        chat.name.toLowerCase().includes(debouncedSearchText.toLowerCase())
      )
    );
  }, [chatsArray, debouncedSearchText]);

  return {
    models: {
      activeModal,
      selectedMenuItem,
      isUpdateUser,
      settingsFormData,
      formDataErorrs,
      sortSelectOptions,
      selectedSortOption,
      sortedChatsArray,
      searchText,
      searchedChats,
      searchLoading,
    },
    commands: {
      setActiveModal,
      setSelectedMenuItem,
      setIsUpdateUser,
      handleChangeFormData,
      handleConfirmUpdateAccount,
      handleCancelUpdate,
      handleSortOptionChange,
      handleSearchChange,
    },
  };
};
