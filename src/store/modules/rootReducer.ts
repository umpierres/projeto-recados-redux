import { combineReducers } from '@reduxjs/toolkit';

import usersSlice from './userSlice';
import tasksSlice from './tasksSlice';
import alertSlice from './alertSlice';

export default combineReducers({
  users: usersSlice,
  tasks: tasksSlice,
  alert: alertSlice,
});
