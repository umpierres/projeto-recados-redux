import AddIcon from '@mui/icons-material/Add';

import {
  Container, Divider, Fab, Grid, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalCreate } from '../components/ModalCreate';
import { useAppSelector } from '../store/hooks';

const Notes: React.FC = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const rememberedLoggedUser = useAppSelector((state) => state.loggedUser.user);
  const loggedUser = sessionStorage.getItem('loggedUser');

  useEffect(() => {
    if (rememberedLoggedUser.email === '') {
      if (!loggedUser) {
        navigate('/');
      }
    }
  }, [navigate]);

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <ModalCreate open={openModal} actionCancel={handleClose} description="Digite seu recado" title="Salvar recados" />
      <Grid container>
        <Grid item xs={12}>
          <Container sx={{ marginTop: '20px' }}>
            <Typography variant="h4">Meus recados:</Typography>
            <Divider />
          </Container>
        </Grid>
      </Grid>
      <Fab color="primary" aria-label="add" size="small" sx={{ position: 'fixed', right: '20px', bottom: '20px' }}>
        <AddIcon
          onClick={() => {
            setOpenModal(true);
          }}
        />
      </Fab>
    </>
  );
};

export default Notes;
