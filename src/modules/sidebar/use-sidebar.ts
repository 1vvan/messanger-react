import { useUpdateUserMutation } from "@/app/services/userApi";
import { accountSettingsSchema } from "@/shared/schemas/accountSettingsSchema";
import { IAccountSettings } from "@/shared/types/user-api-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useSidebar = ({ user }) => {
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

  return {
    models: {
      activeModal,
      selectedMenuItem,
      isUpdateUser,
      settingsFormData,
      formDataErorrs,
    },
    commands: {
      setActiveModal,
      setSelectedMenuItem,
      setIsUpdateUser,
      handleChangeFormData,
      handleConfirmUpdateAccount,
      handleCancelUpdate,
    },
  };
};
