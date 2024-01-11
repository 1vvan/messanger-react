import { useState } from "react";
import { regSchema } from "../schemas/regSchema";
import { useFetchRegisterMutation } from "@/app/services/userApi";
import { RegisterDTO } from "@/shared/types/api-types/user-api-types";

const initRegData = {
  email: "",
  password: "",
  name: "",
  nickname: "",
  lang: "",
};

export const useReg = () => {
  const [registerData, setRegisterData] = useState<RegisterDTO>({
    email: "",
    password: "",
    name: "",
    nickname: "",
    lang: "",
  });

  const [regErrors, setRegErrors] = useState<RegisterDTO>({
    email: "",
    password: "",
    name: "",
    nickname: "",
    lang: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [register, { isLoading }] = useFetchRegisterMutation();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChangeRegData = (key, value) => {
    setRegisterData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleRegValidation = async () => {
    try {
      await regSchema.validate(registerData, { abortEarly: false });
      setRegErrors({
        email: "",
        password: "",
        name: "",
        nickname: "",
        lang: "",
      });
      return true;
    } catch (error: any) {
      const validationErrors: Partial<RegisterDTO> = {};
      error.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setRegErrors(validationErrors as RegisterDTO);
      return false;
    }
  };

  const handleSubmitReg = async (e) => {
    e.preventDefault();
    if (await handleRegValidation()) {
      register(registerData).then(() => {
        setRegisterData(initRegData);
        setRegErrors(initRegData);
      });
    }
  };
  return {
    models: {
      showPassword,
      registerData,
      regErrors,
      isLoading,
    },
    commands: {
      handleMouseDownPassword,
      handleClickShowPassword,
      handleSubmitReg,
      handleChangeRegData,
    },
  };
};
