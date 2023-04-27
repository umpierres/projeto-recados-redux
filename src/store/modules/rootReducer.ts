import { combineReducers } from '@reduxjs/toolkit';

import usersSlice from './usersSlice';
import rememberSlice from './rememberSlice';

export default combineReducers({
  users: usersSlice,
  userRemembered: rememberSlice,

});
