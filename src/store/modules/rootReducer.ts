import { combineReducers } from '@reduxjs/toolkit';

import usersSlice from './usersSlice';
import loggedUserSlice from './loggedUserSlice';
import TasksSlice from './tasksSlice';

export default combineReducers({
  users: usersSlice,
  loggedUser: loggedUserSlice,
  tasks: TasksSlice,
});
