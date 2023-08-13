import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch } from '../store/hooks';
import { deleteTask } from '../store/modules/taskSlice';

interface ModalDeleteProps {
  openModal: boolean;
  actionCancel: () => void;
  ownerID: string;
  noteID: string;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({
  openModal, actionCancel, ownerID, noteID,
}) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    actionCancel();
  };
  const handleDelete = () => {
    dispatch(deleteTask({ ownerID, noteID }));
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
