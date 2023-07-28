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

export const registerUser = createAsyncThunk('user/signup', async (newUser: UserType, { dispatch }) => {
  try {
    const response = await todosApi.post('/users/signup', {
      body: newUser,
    });

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
      return dataAPI;
    }

    console.log(error);
    return {
      success: 'error',
      message: 'Algo está de errado no codigo dessa aplicação! Chame o responsavel por ela.',
    };
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(registerUser.pending, (state, action) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload.success) {
        if (action.payload.data) {
          return {
            user: {
              id: action.payload.data.id,
            },
          };
        }
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {});
  },
});

export default userSlice.reducer;
