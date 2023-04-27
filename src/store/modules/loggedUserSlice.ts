import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserType from '../../types/UserType';

interface UserState {
    user: UserType;
}
const initialState: UserState = {
  user: { email: '', password: '', tasks: [] },
};
export const loggedUserSlice = createSlice({
  name: 'userRemembered',
  initialState,
  reducers: {
    setRememberedUser: (state, action: PayloadAction<UserType>) => {
      state.user.email = action.payload.email;
      state.user.password = action.payload.password;
      state.user.tasks.push(...action.payload.tasks);
    },
  },
});

export default loggedUserSlice.reducer;

export const { setRememberedUser } = loggedUserSlice.actions;
