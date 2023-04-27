import AddIcon from '@mui/icons-material/Add';

import {
  Container, Divider, Fab, Grid, Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalCreate } from '../components/ModalCreate';
import { useAppSelector } from '../store/hooks';

const Notes: React.FC = () => {
  const navigate = useNavigate();

  const rememberedLoggedUser = useAppSelector((state) => state.userRemembered.user);
  const loggedUser = sessionStorage.getItem('usuarioLogado');

  useEffect(() => {
    if (rememberedLoggedUser.email === '') {
      if (!loggedUser) {
        navigate('/');
      }
    }
  }, [navigate]);

  return (
    <>
      <ModalCreate open={false} />
      <Grid container>
        <Grid item xs={12}>
          <Container sx={{ marginTop: '20px' }}>
            <Typography variant="h4">Meus recados:</Typography>
            <Divider />
          </Container>
        </Grid>
      </Grid>
      <Fab color="primary" aria-label="add" size="small" sx={{ position: 'fixed', right: '20px', bottom: '20px' }}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default Notes;
