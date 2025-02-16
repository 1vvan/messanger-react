import { useEffect, useState } from "react";
import { regSchema } from "../../../shared/schemas/regSchema";
import { useFetchRegisterMutation } from "@/app/services/userApi";
import { ApiError, RegisterDTO } from "@/shared/types/user-api-types";
import { ROUTES } from "@/shared/constants/routes/routes";
import { toast } from "react-toastify";

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
  const [register, { isLoading, error: regError }] = useFetchRegisterMutation();

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

  useEffect(() => {
    const err = regError as ApiError;
    if (err) {
      toast.error(err.data?.message || "Error. Try again later");
    }
  }, [regError]);

  const handleSubmitReg = async (e) => {
    e.preventDefault();
    if (await handleRegValidation()) {
      register(registerData).then(() => {
        setRegisterData(initRegData);
        setRegErrors(initRegData);
        document.location.href = ROUTES.LOGIN.path;
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
