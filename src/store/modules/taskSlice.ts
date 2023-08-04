import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import todosApi from '../../config/services/todosApi';
import TaskType from '../../types/TaskType';
import { RootState } from '..';
import { ResponseCreateTask } from '../../types/ResponseCreateTask';
import { hideAlert, showAlert } from './alertSlice';
import { ResponseUpdateTask, UpdateNoteDTO } from '../../types/ResponseUpdateTask';
import UserType from '../../types/UserType';
import { ResponseGetTasks } from '../../types/ResponseGetTasks';

const initialState = {
  task: {
    id: '',
    ownerID: '',
  },
  loading: false,
};

// create note

export const createTask = createAsyncThunk('notes/create/', async (newTask: Omit<TaskType, 'id'>, { dispatch }) => {
  try {
    const response = await todosApi.post('/notes/create/', newTask);
    const dataAPI = response.data as ResponseCreateTask;
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
      const dataAPI = error.response?.data as ResponseCreateTask;

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

// update note

export const updateTask = createAsyncThunk('/notes/edit/', async (updatedTask: UpdateNoteDTO, { dispatch }) => {
  try {
    const response = await todosApi.put('/notes/edit/', updatedTask);
    const dataAPI = response.data as ResponseUpdateTask;
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
      const dataAPI = error.response?.data as ResponseCreateTask;

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

export const listTasks = createAsyncThunk('/notes/', async (ownerIDTask: string, { dispatch }) => {
  try {
    const response = await todosApi.get(`/notes/${ownerIDTask}`);
    const dataAPI = response.data as ResponseGetTasks;
    return dataAPI.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const dataAPI = error.response?.data as ResponseGetTasks;

      return dataAPI;
    }

    return { success: false, message: 'Algo está errado com essa aplicação! Chame o responsavel por ela' };
  }
});

export const deleteTask = createAsyncThunk('/notes/delete/', async (noteId: string, { dispatch }) => {
  try {
    const response = await todosApi.post('/notes/delete/', noteId);
    const dataAPI = response.data as ResponseUpdateTask;
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
      const dataAPI = error.response?.data as ResponseCreateTask;

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

export const toggleFavorite = createAsyncThunk('notes/toggle-favorite', async (noteId: string) => {
  try {
    const response = await todosApi.post(`/notes/update-note/${noteId}`, { favorite: true });
    const dataAPI = response.data as ResponseUpdateTask;
    return dataAPI;
  } catch (error) {
    return { success: false, message: 'Algo está errado com essa aplicação! Chame o responsável por ela.' };
  }
});

export const toggleArchived = createAsyncThunk('notes/toggle-archived', async (noteId: string) => {
  try {
    const response = await todosApi.post(`/notes/update-note/${noteId}`, { archived: true });
    const dataAPI = response.data as ResponseUpdateTask;
    return dataAPI;
  } catch (error) {
    return { success: false, message: 'Algo está errado com essa aplicação! Chame o responsável por ela.' };
  }
});

export const TaskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      if (action.payload.success && action.payload.data) {
        const { id, ownerID } = action.payload.data; // Certifique-se de que sua API está retornando o 'id' e 'ownerId' corretamente
        return {
          ...state,
          task: {
            id,
            ownerID,
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
    builder.addCase(createTask.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateTask.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(listTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listTasks.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(listTasks.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteTask.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(toggleFavorite.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(toggleFavorite.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(toggleFavorite.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(toggleArchived.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(toggleArchived.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(toggleArchived.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default TaskSlice.reducer;
