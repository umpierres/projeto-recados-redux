import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserType from '../../types/userType';

interface UserState {
    user: UserType;
}
const initialState: UserState = {
  user: {
    email: '', password: '', remember: false,
  },
};
export const loggedUserSlice = createSlice({
  name: 'userRemembered',
  initialState,
  reducers: {
    setRememberedUser: (state, action: PayloadAction<UserType>) => {
      state.user.email = action.payload.email;
      state.user.password = action.payload.password;
      state.user.remember = action.payload.remember;
    },
  },
});

export default loggedUserSlice.reducer;

export const { setRememberedUser } = loggedUserSlice.actions;
