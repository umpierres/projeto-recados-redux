import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import UserType from '../../types/UserType';
import ResponseSignup from '../../types/ResponseSignup';
import { RootState } from '..';
import todosApi from '../../config/services/todosApi';
import { hideAlert, showAlert } from './alertSlice';

const initialState = {
  user: {
    id: '',
    email: '',
    password: '',
    remember: false,
  },
  loading: false,
};

export const registerUser = createAsyncThunk('users/signup', async (newUser: UserType, { dispatch }) => {
  try {
    const response = await todosApi.post('/users/signup', newUser);

    const dataAPI = response.data as ResponseSignup;

    dispatch(
      showAlert({
        message: dataAPI.message,
        type: 'success',
        display: 'show',
      }),
    );
    setTimeout(() => {
      dispatch(hideAlert({ display: 'none', type: 'warning', message: '' }));
    }, 1000);

    return dataAPI;
  } catch (error) {
    if (error instanceof AxiosError) {
      const dataAPI = error.response?.data as ResponseSignup;

      dispatch(
        showAlert({
          message: dataAPI.message,
          type: 'error',
          display: 'show',
        }),
      );
      setTimeout(() => {
        dispatch(hideAlert({ display: 'none', type: 'warning', message: '' }));
      }, 1000);
      return dataAPI;
    }
    console.log(error);
    return { success: false, message: 'Algo está errado com essa aplicação! Chame o responsavel por ela' };
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(registerUser.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload.success && action.payload.data) {
        return {
          user: {
            id: action.payload.data.id,
            email: action.payload.data.email,
            password: action.payload.data.password,
            remember: action.payload.data.remember,
          },
          loading: false,
        };
      }
      if (!action.payload?.success) {
        return {
          ...state,
          loading: false,
        };
      }
      return state;
    });
    builder.addCase(registerUser.rejected, (state) => ({
      ...state,
      loading: false,
    }));
  },
});

export default userSlice.reducer;
