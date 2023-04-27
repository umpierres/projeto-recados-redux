import { combineReducers } from '@reduxjs/toolkit';

import usersSlice from './usersSlice';
import loggedUserSlice from './loggedUserSlice';

export default combineReducers({
  users: usersSlice,
  loggedUser: loggedUserSlice,
});
