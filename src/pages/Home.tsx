import React, { useEffect } from 'react';
import {
  Button, Grid, Typography, Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { visitorRoutes } from '../routes/routes';
import { useAppSelector } from '../store/hooks';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const rememberedUser = useAppSelector((state) => state.loggedUser.user);
  useEffect(() => {
    if (rememberedUser.remember) {
      navigate('/notes');
    }
  }, [navigate]);

  const getRouteUrl = (name: string) => {
    const route = visitorRoutes.find((r) => r.label === name);
    return route ? route.url : '/';
  };

  return (
    <Grid container display={{ xs: 'flex' }} justifyContent="center">
      <Grid item ml={{ md: 26 }} xs={8} md={5} my={2}>
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontSize: '24px',
              '@media (min-width:600px)': {
                fontSize: '48px',
              },
            }}
          >
            Bem-vindo ao nosso site de lista de tarefas!
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: '12px',
              '@media (min-width:600px)': {
                fontSize: '20px',
              },
            }}
          >
            Aqui, você pode organizar suas tarefas diárias, semanais ou mensais em um só lugar. Experimente a praticidade de ter todas as suas tarefas em um só
            lugar e seja mais produtivo e eficiente!
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={5} display="flex" justifyContent="space-around" alignItems="center">
        <Button
          size="large"
          sx={{
            maxHeight: '55px',
            fontSize: '9px',
            marginX: '20px',
            '@media (min-width:600px)': {
              maxHeight: '48px',
              fontSize: '16px',
            },
          }}
          variant="contained"
          onClick={() => navigate(getRouteUrl('Cadastrar'))}
        >
          Cadastrar
        </Button>
        <Button
          size="large"
          sx={{
            maxHeight: '55px',
            fontSize: '9px',
            marginX: '20px',
            '@media (min-width:600px)': {
              maxHeight: '48px',
              fontSize: '16px',
            },
          }}
          variant="contained"
          onClick={() => navigate(getRouteUrl('Entrar'))}
        >
          Entrar
        </Button>
      </Grid>
    </Grid>
  );
};

export default Home;
