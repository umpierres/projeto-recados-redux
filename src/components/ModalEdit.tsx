import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { editTask } from '../store/modules/tasksSlice';
import Task from '../types/taskType';

interface ModalEditProps {
  task: Task;
  open: boolean;
  actionConfirm: () => void;
  actionCancel: () => void;
}

const ModalEdit: React.FC<ModalEditProps> = ({
  task, open, actionConfirm, actionCancel,
}) => {
  const [taskTitle, setTaskTitle] = useState<string>(task.title);
  const [taskDescription, setTaskDescription] = useState<string>(task.detail);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [titleHelperText, setTitleHelperText] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [descriptionHelperText, setDescriptionHelperText] = useState<string>('');

  useEffect(() => {
    setTaskTitle(task.title);
    setTaskDescription(task.detail);
  }, [task]);

  useEffect(() => {
    if (taskDescription.length > 100) {
      setDescriptionError(true);
      setDescriptionHelperText('Ultrapassou limite de caracteres');
    } else {
      setDescriptionError(false);
      setDescriptionHelperText('');
    }
  }, [taskDescription]);
  useEffect(() => {
    if (taskTitle.length > 30) {
      setTitleError(true);
      setTitleHelperText('Ultrapassou limite de caracteres');
    } else {
      setTitleError(false);
      setTitleHelperText('');
    }
  }, [taskTitle]);

  const rememberedLoggedUser = useAppSelector((state) => state.loggedUser.user);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setTaskTitle(task.title);
    setTaskDescription(task.detail);
    actionCancel();
  };
  const handleConfirm = () => {
    const data = new Date().toLocaleString();
    const updatedTask: Task = {
      ...task,
      title: taskTitle!,
      detail: taskDescription!,
      date: `${data}`,
      owner: `${rememberedLoggedUser.email}`,
    };
    dispatch(editTask(updatedTask));
    actionConfirm();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Tarefa</DialogTitle>
        <DialogContent>
          <DialogContentText>Atualize os dados da tarefa:</DialogContentText>
          <TextField
            error={titleError}
            helperText={titleHelperText}
            required
            margin="dense"
            value={taskTitle}
            onChange={(ev) => {
              setTaskTitle(ev.target.value);
            }}
            id="title"
            label="Título da Tarefa"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            error={descriptionError}
            helperText={descriptionHelperText}
            required
            margin="dense"
            value={taskDescription}
            onChange={(ev) => setTaskDescription(ev.target.value)}
            id="detail"
            label="Descrição da Tarefa"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: 'text.secondary' }} onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            sx={{ color: 'text.secondary' }}
            onClick={handleConfirm}
            disabled={!taskTitle || !taskDescription || taskTitle.length > 30 || taskDescription.length > 100}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalEdit;
