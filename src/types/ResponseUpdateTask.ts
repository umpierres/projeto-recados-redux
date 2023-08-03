import TaskType from './TaskType';

type UpdateNoteDTO = {
  title: string;
  description: string;
  owner: string;
};

type ResponseUpdateTask = {
  success: boolean;
  message: string;
  data?: TaskType;
};

export type { UpdateNoteDTO, ResponseUpdateTask };
