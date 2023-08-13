import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Task from '../types/TaskType';
import { updateTask } from '../store/modules/taskSlice';

interface ModalEditProps {
  task: Task;
  open: boolean;
  actionConfirm: () => void;
  actionCancel: () => void;
}

const ModalEdit: React.FC<ModalEditProps> = ({
  task, open, actionConfirm, actionCancel,
}) => {
  const userState = useAppSelector((state) => state.user);
  const [taskTitle, setTaskTitle] = useState<string>(task.title);
  const [taskDescription, setTaskDescription] = useState<string>(task.description);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [titleHelperText, setTitleHelperText] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [descriptionHelperText, setDescriptionHelperText] = useState<string>('');

  useEffect(() => {
    setTaskTitle(task.title);
    setTaskDescription(task.description);
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

  const rememberedLoggedUser = userState.user;
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    actionCancel();
  };
  const handleConfirm = () => {
    const updatedTask: Task = {
      ...task,
      title: taskTitle!,
      description: taskDescription!,
      ownerID: `${rememberedLoggedUser.id}`,
    };
    dispatch(updateTask({ ownerID: updatedTask.ownerID, noteID: updatedTask.id!, updatedTask }));
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
