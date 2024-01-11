import {
  LoginDTO,
  LoginResponce,
  RegisterDTO,
} from "@/shared/types/api-types/user-api-types";
import { api } from "./api";
import { IUser } from "@/shared/types/IUser";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchLogin: builder.mutation<LoginResponce, LoginDTO>({
      query: (data: LoginDTO) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    fetchRegister: builder.mutation<IUser, RegisterDTO>({
      query: (data: RegisterDTO) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useFetchLoginMutation, useFetchRegisterMutation } = userApi;
