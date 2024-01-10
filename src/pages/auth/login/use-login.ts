import { ROUTES } from "@/constants/routes/routes";
import { useState } from "react";
import { loginSchema } from "../schemas/loginSchema";

interface LoginData {
  email: string;
  password: string;
}

export const logout = () => {
  localStorage.removeItem("accessToken");
  document.location.href = ROUTES.LOGIN.path;
};

export const useLogin = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const isAuthenticated = () => {
    const accessToken = localStorage.getItem("accessToken");
    return !!accessToken;
  };

  const handleChangeLoginData = (key, value) => {
    setLoginData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleLoginValidation = async () => {
    try {
      await loginSchema.validate(loginData, { abortEarly: false });
      setLoginErrors({ email: "", password: "" });
      return true;
    } catch (error: any) {
      const validationErrors: Partial<LoginData> = {};
      error.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setLoginErrors(validationErrors as LoginData);
      return false;
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (await handleLoginValidation()) {
      console.log(loginData);
      localStorage.setItem("accessToken", "123");
      document.location.href = ROUTES.MESSANGER.path;
    }
  };

  return {
    models: {
      showPassword,
      loginData,
      loginErrors,
    },
    commands: {
      isAuthenticated,
      handleClickShowPassword,
      handleMouseDownPassword,
      handleChangeLoginData,
      handleSubmitLogin,
    },
  };
};
