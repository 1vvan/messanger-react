import { IUser } from "@/shared/types/IUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: IUser;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  user: {
    _id: "",
    name: "",
    nickname: "",
    profilePicture: "",
    lang: "",
    email: "",
  },
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
