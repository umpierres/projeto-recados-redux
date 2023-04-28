import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import TaskType from '../../types/taskType';
import { RootState } from '..';

const adapter = createEntityAdapter<TaskType>({ selectId: (task) => task.id });

export const TasksSlice = createSlice({
  name: 'tasks',
  initialState: adapter.getInitialState(),
  reducers: {
    addTask: adapter.addOne,
    removeTask: adapter.removeOne,
    editTask: adapter.setOne,
  },
});

export default TasksSlice.reducer;

export const { addTask, removeTask, editTask } = TasksSlice.actions;
export const { selectById: SelectTaskById, selectAll: SelectAllTasks } = adapter.getSelectors((state:RootState) => state.tasks);
