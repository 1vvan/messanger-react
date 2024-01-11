import { LoginDTO, LoginResponce, RegisterDTO } from "@/models/api-types/user-api-types";
import { api } from "./api";
import { IUser } from "@/models/IUser";

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

export const {useFetchLoginMutation, useFetchRegisterMutation} = userApi