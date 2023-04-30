import React, { useState } from 'react';
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

// pegar o tasksSlice e passar os valores por essa pagina, criar states e passar os states para o adapter

export const ModalCreate: React.FC<ModalCreateProps> = ({
  open, actionConfirm, actionCancel, title, description,
}) => {
  const [taskTitle, setTaskTitle] = useState<string>('aaaaa');
  const [taskDescription, setTaskDescription] = useState<string>('aaaaaa');

  const rememberedLoggedUser = useAppSelector((state) => state.loggedUser.user);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    actionCancel();
  };
  const handleConfirm = () => {
    const data = new Date().toLocaleString();
    const newTask: Task = {
      id: Date.now(),
      task: taskTitle,
      detail: taskDescription,
      favorite: false,
      date: `${data}`,
      owner: `${rememberedLoggedUser.email}`,
    };
    console.log(newTask.owner);
    dispatch(addTask(newTask));
    actionConfirm();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <TextField autoFocus margin="dense" id="title" label="Titulo do recado" type="text" fullWidth variant="standard" />
          <TextField autoFocus margin="dense" id="detail" label="Descrição do recado" type="text" fullWidth variant="standard" />
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: 'text.secondary' }} onClick={handleClose}>
            Cancelar
          </Button>
          <Button sx={{ color: 'text.secondary' }} onClick={handleConfirm}>
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
