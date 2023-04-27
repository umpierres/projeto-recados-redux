import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserType from '../../types/UserType';

interface UserState {
    user: UserType;
}
const initialState: UserState = {
  user: { email: '', password: '', tasks: [] },
};
export const userRemember = createSlice({
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

export default userRemember.reducer;

export const { setRememberedUser } = userRemember.actions;
