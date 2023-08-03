import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import taskSlice from './taskSlice';
import alertSlice from './alertSlice';

export default combineReducers({
  user: userSlice,
  task: taskSlice,
  alert: alertSlice,
});
