import * as yup from "yup";

export const accountSettingsSchema = yup.object().shape({
  nickname: yup
    .string()
    .required("Nickname is required")
    .min(3, "The nickname should be more than 3 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
});
