import * as yup from "yup";

export const regSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  name: yup.string().min(4, "The name should be more than 4 characters"),
  nickname: yup
    .string()
    .min(4, "The nickname should be more than 4 characters"),
  lang: yup.string(),
});
