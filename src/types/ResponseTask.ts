import TaskType from './TaskType';

export type ResponseTask = {
  success: boolean;
  message: string;
  data?: Array<TaskType>;
};
