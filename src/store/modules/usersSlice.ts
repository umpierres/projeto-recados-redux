import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import UserType from '../../types/userType';
import { RootState } from '..';

const adapter = createEntityAdapter<UserType>({ selectId: (user) => user.email });

export const usersSlice = createSlice({
  name: 'users',
  initialState: adapter.getInitialState(),
  reducers: {
    addUser: adapter.addOne,
  },
});

export default usersSlice.reducer;

export const { addUser } = usersSlice.actions;
export const { selectById: SelectUserByEmail, selectAll: SelectAllUsers } = adapter.getSelectors((state:RootState) => state.users);
