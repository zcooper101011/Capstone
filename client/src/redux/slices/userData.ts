import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface UserDataState {
  userId: number;
  permissions: string[];
  userFirstName: string;
}

// Define the initial state using that type
const initialState: UserDataState = {
  userId: 0,
  permissions: [],
  userFirstName: ''
};

export const userDataSlice = createSlice({
  name: "userData",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
    setPermissions: (state, action: PayloadAction<string[]>) => {
      state.permissions = action.payload;
    },
    setUserFirstName: (state, action: PayloadAction<string>) => {
      state.userFirstName = action.payload;
    },
  },
});

export const { setUserId, setPermissions, setUserFirstName } = userDataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getUserData = (state: RootState) => state.userData;

export default userDataSlice.reducer;
