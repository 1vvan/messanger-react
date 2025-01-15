import * as yup from "yup";

export const regSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
      .string()
      .required("Password is required")
      .min(8, "The password should be at least 8 characters")
      .max(20, "The password cannot be longer than 20 characters")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, "The password must contain at least one letter and one digit"),
  name: yup.string().min(4, "The name should be more than 4 characters"),
  nickname: yup
    .string()
    .min(4, "The nickname should be more than 4 characters"),
  lang: yup.string(),
});
