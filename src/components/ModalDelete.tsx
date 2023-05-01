import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { removeTask } from '../store/modules/tasksSlice';
import { useAppDispatch } from '../store/hooks';

interface ModalDeleteProps {
  openModal: boolean;
  actionCancel: () => void;
  TaskId: number;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({ openModal, actionCancel, TaskId }) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    actionCancel();
  };
  const handleDelete = () => {
    dispatch(removeTask(TaskId));
    actionCancel();
  };

  return (
    <Dialog open={openModal} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Deseja deletar esse recado?</DialogTitle>

      <DialogActions>
        <Button sx={{ color: 'text.secondary' }} onClick={handleClose}>
          Cancelar
        </Button>
        <Button sx={{ color: 'text.secondary' }} onClick={handleDelete} autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDelete;
