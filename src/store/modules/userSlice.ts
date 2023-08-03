import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import UserType from '../../types/UserType';
import todosApi from '../../config/services/todosApi';
import { hideAlert, showAlert } from './alertSlice';
import ResponseSignIn from '../../types/ResponseSignIn';
import ResponseSignUp from '../../types/ResponseSignUp';

const initialState = {
  user: {
    id: '',
    logged: false,
    email: '',
  },
  loading: false,
};

export const registerUser = createAsyncThunk('users/signup', async (newUser: UserType, { dispatch }) => {
  try {
    const response = await todosApi.post('/users/signup', newUser);

    const dataAPI = response.data as ResponseSignUp;

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
      const dataAPI = error.response?.data as ResponseSignUp;

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

    return { success: false, message: 'Algo está errado com essa aplicação! Chame o responsavel por ela' };
  }
});

export const loginUser = createAsyncThunk('users/signin', async (userData: UserType, { dispatch }) => {
  try {
    const response = await todosApi.post('/users/signin', userData);

    const dataAPI = response.data as ResponseSignIn;

    dispatch(
      showAlert({
        message: dataAPI.message,
        type: 'success',
        display: 'show',
      }),
    );

    setTimeout(() => {
      dispatch(hideAlert({ display: 'none', type: 'warning', message: '' }));
    }, 500);

    return dataAPI;
  } catch (error) {
    if (error instanceof AxiosError) {
      const dataAPI = error.response?.data as ResponseSignIn;

      dispatch(
        showAlert({
          message: dataAPI.message,
          type: 'error',
          display: 'show',
        }),
      );

      setTimeout(() => {
        dispatch(hideAlert({ display: 'none', type: 'warning', message: '' }));
      }, 2000);

      return dataAPI;
    }

    return { success: false, message: 'Algo está errado com essa aplicação! Chame o responsavel por ela' };
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => ({
      ...state,
      user: {
        id: action.payload,
        email: action.payload,
        logged: true,
      },
    }),
    logoutUser: () => {
      localStorage.removeItem('userLogged');
      return initialState;
    },
  },
  extraReducers(builder) {
    // cadastro

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
            logged: false,
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

    // login

    builder.addCase(loginUser.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload.success && action.payload.data) {
        localStorage.setItem('userLogged', JSON.stringify(action.payload.data));

        return {
          user: {
            id: action.payload.data.id,
            email: action.payload.data.email,
            logged: true,
          },
          loading: false,
        };
      }

      return initialState;
    });
    builder.addCase(loginUser.rejected, () => initialState);
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
