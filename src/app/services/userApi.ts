import {
  LoginDTO,
  LoginResponce,
  RegisterDTO,
  RequestUpdateUserData,
} from "@/shared/types/user-api-types";
import { api } from "./api";
import { IUser } from "@/shared/types/IUser";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchLogin: builder.mutation<LoginResponce, LoginDTO>({
      query: (data: LoginDTO) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    fetchRegister: builder.mutation<IUser, RegisterDTO>({
      query: (data: RegisterDTO) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    getCurrentUser: builder.query<IUser, string>({
      query: () => ({ url: "/users/current" }),
      providesTags: ['CurrentUser'],
    }),
    updateUser: builder.mutation<IUser, RequestUpdateUserData>({
      query: ({ userId, data }) => ({
        url: `/users/${userId}/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['CurrentUser'],
    }),
  }),
});

export const { useFetchLoginMutation, useFetchRegisterMutation, useGetCurrentUserQuery, useUpdateUserMutation } = userApi;
