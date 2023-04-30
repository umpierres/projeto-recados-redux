import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

interface ModalDeleteProps {
  openModal: boolean;
  actionCancel: () => void;
  id: number;
  removeTask: (id: number) => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({
  openModal, actionCancel, removeTask, id,
}) => {
  const handleClose = () => {
    actionCancel();
  };
  const handleDelete = () => {
    removeTask(id);
  };

  return (
    <Dialog open={openModal} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Deseja deletar esse recado?</DialogTitle>

      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleDelete} autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDelete;
