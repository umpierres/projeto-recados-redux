import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import todosApi from '../../config/services/todosApi';
import TaskType from '../../types/TaskType';
import { hideAlert, showAlert } from './alertSlice';
import ResponseCreateTask from '../../types/ResponseCreateTask';
import { ResponseTask } from '../../types/ResponseTask';
import { OwnerAndFilter } from '../../types/SliceTypes';

const initialState = {
  task: {
    noteID: '',
    ownerID: '',
    notes: [] as TaskType[],
  },
  loading: false,
};

// create note

export const createTask = createAsyncThunk('notes/create', async (newTask: TaskType, { dispatch }) => {
  try {
    const response = await todosApi.post(`/notes/${newTask.ownerID}`, newTask);

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

export const listTasks = createAsyncThunk('notes/list', async ({ ownerID, filter }: OwnerAndFilter, { dispatch }) => {
  try {
    const response = await todosApi.get(`/notes/${ownerID}`, { params: { filter } });
    const dataAPI = response.data as ResponseTask;
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
    return dataAPI.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const dataAPI = error.response?.data as ResponseTask;
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

export const deleteTask = createAsyncThunk('notes/delete', async ({ ownerID, noteID }: { ownerID: string; noteID: string }, { dispatch }) => {
  try {
    const response = await todosApi.delete(`/notes/${ownerID}/${noteID}`);

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

    return { success: false, message: 'Algo está errado com essa aplicação! Chame o responsável por ela' };
  }
});

export const updateTask = createAsyncThunk(
  'notes/edit',
  async ({ ownerID, noteID, updatedTask }: { ownerID: string; noteID: string; updatedTask: TaskType }, { dispatch }) => {
    try {
      const response = await todosApi.put(`/notes/${ownerID}/${noteID}`, updatedTask);

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

      return { success: false, message: 'Algo está errado com essa aplicação! Chame o responsável por ela' };
    }
  },
);

export const toggleStatusTask = createAsyncThunk(
  'notes/toggleStatus',
  async ({ ownerID, noteID, action }: { ownerID: string; noteID: string; action: string }, { dispatch }) => {
    try {
      const response = await todosApi.put(`/notes/${ownerID}/${noteID}/${action}`);

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

      dispatch(listTasks({ ownerID, filter: {} }));

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

      return { success: false, message: 'Algo está errado com essa aplicação! Chame o responsável por ela' };
    }
  },
);

export const TaskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // criar
    builder.addCase(createTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      if (action.payload.success && action.payload.data) {
        const { id, ownerID } = action.payload.data;
        return {
          ...state,
          task: {
            ...state.task,
            noteID: id!,
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

    // listar
    builder.addCase(listTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listTasks.fulfilled, (state, action) => {
      if (action.payload && 'notes' in action.payload) {
        return {
          ...state,
          task: {
            ...state.task,
            notes: action.payload.notes as TaskType[],
          },
          loading: false,
        };
      }
      return state;
    });
    builder.addCase(listTasks.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      if (action.payload.success) {
        return {
          ...state,
          loading: false,
        };
      }
      return state;
    });
    builder.addCase(deleteTask.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      if (action.payload.success) {
        return {
          ...state,
          loading: false,
        };
      }
      return state;
    });
    builder.addCase(updateTask.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(toggleStatusTask.fulfilled, (state, action) => {
      if (action.payload.success) {
        return {
          ...state,
          loading: false,
        };
      }
      return state;
    });
  },
});

export default TaskSlice.reducer;
