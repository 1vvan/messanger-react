import { useUpdateUserMutation } from "@/app/services/userApi";
import { setUser } from "@/app/store/reducers/UserSlice";
import { accountSettingsSchema } from "@/shared/schemas/accountSettingsSchema";
import { IAccountSettings, IChat } from "@/shared/types/user-api-types";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const sortSelectOptions = [
  { value: "time", label: "Newest" },
  { value: "name", label: "Name" },
];

const initialUserData = {
  nickname: "",
  name: "",
  lang: "",
  email: "",
  profilePicture: ""
}

export const useSidebar = ({ user, userChats }) => {
  const dispatch = useDispatch();
  const [activeModal, setActiveModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<number>(2);
  const [isUpdateUser, setIsUpdateUser] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [settingsFormData, setSettingFormData] = useState<IAccountSettings>(initialUserData);
  const [formDataErorrs, setFormDataErorrs] = useState<IAccountSettings>(initialUserData);
  const [updateUser] = useUpdateUserMutation();
  const [selectedSortOption, setSelectedSortOption] = useState("time");
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setSettingFormData({
        nickname: user?.nickname,
        name: user?.name,
        lang: user?.lang,
        email: user?.email,
        profilePicture: user?.profilePicture
      });
    }
  }, [user]);

  const validateForm = async () => {
    try {
      await accountSettingsSchema.validate(settingsFormData, {
        abortEarly: false,
      });
      return true;
    } catch (error: any) {
      const validationErrors = initialUserData;
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };  

  const handleConfirmUpdateAccount = async (e) => {
    e.preventDefault();
    if (await validateForm()) {
      if (user?._id) {
        const formData = new FormData();
        formData.append('nickname', settingsFormData.nickname);
        formData.append('name', settingsFormData.name);
        formData.append('lang', settingsFormData.lang);
        formData.append('email', settingsFormData.email);
        
        if (file) {
          formData.append('file', file);
        }
  
        updateUser({ userId: user._id, data: formData }).then((response) => {
          if ('data' in response && response.data) {
            setSettingFormData({
              nickname: response?.data.nickname,
              name: response?.data.name,
              lang: response?.data.lang,
              email: response?.data.email,
              profilePicture: response?.data.profilePicture
            });
            toast.success("Update account successfully");
          }
        });
      }
    }
  };

  const handleCancelUpdate = () => {
    setSettingFormData({
      nickname: user?.nickname,
      name: user?.name,
      lang: user?.lang,
      email: user?.email,
      profilePicture: user?.profilePicture
    });
    setFormDataErorrs(initialUserData);
    setIsUpdateUser(false);
  };

  const handleChangeUserSavedTheme = () => {
    const newMode = localStorage.getItem("themeMode");

    if (newMode !== null) {
      const formData = new FormData();
      formData.append('themeMode', newMode);
  
      updateUser({ userId: user._id, data: formData }).then(() => {
        dispatch(setUser({
          ...user,
          themeMode: newMode,
        }));
        toast.success("Theme changed successfully");
      });
    } 
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
      handleFileChange,
      handleConfirmUpdateAccount,
      handleCancelUpdate,
      handleSortOptionChange,
      handleSearchChange,
      handleChangeUserSavedTheme
    },
  };
};
