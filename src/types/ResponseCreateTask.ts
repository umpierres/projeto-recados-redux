import TaskType from './TaskType';

export type ResponseCreateTask = {
  success: boolean;
  message: string;
  data?: TaskType;
};
