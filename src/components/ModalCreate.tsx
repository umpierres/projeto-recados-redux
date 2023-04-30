import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch } from '../store/hooks';
import { addTask } from '../store/modules/tasksSlice';

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
  const dispatch = useAppDispatch();
  const handleClose = () => {
    actionCancel();
  };

  const handleConfirm = () => {
    dispatch(
      addTask({
        id: Date.now(),
        task: 'Roda roda',
        detail: 'blablalblallbllal',
        favorite: false,
        time: 'Date.now()',
        date: '23/02/32',
        owner: 'e2u@gmail.com',
      }),
    );
    actionConfirm();
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth variant="standard" />
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
