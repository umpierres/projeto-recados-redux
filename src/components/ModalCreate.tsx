import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTask } from '../store/modules/tasksSlice';
import Task from '../types/taskType';

interface ModalCreateProps {
  title: string;
  description: string;
  open: boolean;
  actionConfirm: () => void;
  actionCancel: () => void;
}

const ModalCreate: React.FC<ModalCreateProps> = ({
  open, actionConfirm, actionCancel, title, description,
}) => {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);
  const [titleHelperText, setTitleHelperText] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [descriptionHelperText, setDescriptionHelperText] = useState<string>('');

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
    actionCancel();
    setTaskTitle('');
    setTaskDescription('');
  };
  const handleConfirm = () => {
    const data = new Date().toLocaleString();
    const newTask: Task = {
      id: Date.now(),
      title: taskTitle,
      detail: taskDescription,
      favorite: false,
      date: `${data}`,
      owner: `${rememberedLoggedUser.email}`,
    };
    dispatch(addTask(newTask));
    actionConfirm();
    setTaskTitle('');
    setTaskDescription('');
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <TextField
            error={titleError}
            helperText={titleHelperText}
            required
            margin="dense"
            value={taskTitle}
            onChange={(ev) => setTaskTitle(ev.target.value)}
            id="title"
            label="Titulo do recado"
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
            label="Descrição do recado"
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
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalCreate;
