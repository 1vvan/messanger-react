import { ROUTES } from "@/shared/constants/routes/routes";
import { useEffect, useState } from "react";
import { loginSchema } from "../../../shared/schemas/loginSchema";
import { useFetchLoginMutation } from "@/app/services/userApi";
import { ApiError, LoginDTO, LoginResponce } from "@/shared/types/user-api-types";
import { toast } from "react-toastify";

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("themeMode");
  document.location.href = ROUTES.LOGIN.path;
};

const initLoginData = {
  email: "",
  password: "",
};

export const useLogin = () => {
  const [loginData, setLoginData] = useState<LoginDTO>({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState<LoginDTO>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, error: loginError }] = useFetchLoginMutation();

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
      const validationErrors: Partial<LoginDTO> = {};
      error.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setLoginErrors(validationErrors as LoginDTO);
      return false;
    }
  };

  useEffect(() => {
    const err = loginError as ApiError;
    if (err) {
      toast.error(err.data?.message || "Error. Try again later");
    }
  }, [loginError]);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (await handleLoginValidation()) {
      login(loginData).then((response) => {
        const responseData = response as { data: LoginResponce };
        if (responseData.data) {
          localStorage.setItem("accessToken", responseData.data.access_token);
          setLoginData(initLoginData);
          setLoginErrors(initLoginData);
          document.location.href = ROUTES.MESSANGER.path;
        }
      });
    }
  };

  return {
    models: {
      showPassword,
      loginData,
      loginErrors,
      isLoading,
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
