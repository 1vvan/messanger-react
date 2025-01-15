import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  lang: yup.string(),
  name: yup.string().min(4, "The name should be more than 4 characters"),
});
