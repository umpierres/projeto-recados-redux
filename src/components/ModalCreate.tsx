import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ModalCreateProps {
  title: string;
  description: string;
  open: boolean;
  actionConfirm?: () => void;
  actionCancel: () => void;
}

export const ModalCreate: React.FC<ModalCreateProps> = ({
  open, actionConfirm, actionCancel, title, description,
}) => {
  const handleClose = () => {
    actionCancel();
  };

  const addTask = () => {
    console.log('logica de cadastrar o recado');
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
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={addTask}>Adicionar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
