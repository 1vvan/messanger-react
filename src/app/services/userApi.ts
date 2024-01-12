import {
  LoginDTO,
  LoginResponce,
  RegisterDTO,
} from "@/shared/types/user-api-types";
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
    getCurrentUser: builder.query<IUser, string>({
      query: () => ({ url: '/user'})
    }),
  }),
});

export const { useFetchLoginMutation, useFetchRegisterMutation, useGetCurrentUserQuery } = userApi;
