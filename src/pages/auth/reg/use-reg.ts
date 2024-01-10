import { useState } from "react";
import { regSchema } from "../schemas/regSchema";

interface RegData {
  email: string;
  password: string;
  name: string;
  nickname: string;
  lang: string;
}

export const useReg = () => {
  const [registerData, setRegisterData] = useState<RegData>({
    email: "",
    password: "",
    name: "",
    nickname: "",
    lang: "",
  });
    
    const [regErrors, setRegErrors] = useState<RegData>({
      email: "",
      password: "",
      name: "",
      nickname: "",
      lang: "",
    });

  const [showPassword, setShowPassword] = useState(false);

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
        const validationErrors: Partial<RegData> = {};
        error.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setRegErrors(validationErrors as RegData);
        return false;
      }
    };

  const handleSubmitReg = async (e) => {
    e.preventDefault();
      if (await handleRegValidation()) {
          console.log(registerData);
      }
  };
  return {
    models: {
      showPassword,
      registerData,
      regErrors,
    },
    commands: {
      handleMouseDownPassword,
      handleClickShowPassword,
      handleSubmitReg,
      handleChangeRegData,
    },
  };
};
