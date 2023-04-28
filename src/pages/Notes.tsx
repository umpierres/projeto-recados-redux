import AddIcon from '@mui/icons-material/Add';

import {
  Container, Divider, Fab, Grid, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalCreate } from '../components/ModalCreate';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import BasicCard from '../components/BasicCard';
import { SelectAllTasks, addTask } from '../store/modules/tasksSlice';

const Notes: React.FC = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const rememberedLoggedUser = useAppSelector((state) => state.loggedUser.user);
  const loggedUser = sessionStorage.getItem('loggedUser');

  const dispatch = useAppDispatch();

  const allTasks = useAppSelector(SelectAllTasks);
  const userLoggedTasks = allTasks.filter((task) => task?.owner === rememberedLoggedUser.email);
  console.log(userLoggedTasks);
  console.log(allTasks);

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
    setOpenModal(false);
  };

  return (
    <>
      <ModalCreate
        open={openModal}
        actionCancel={handleClose}
        actionConfirm={handleConfirm}
        description="Digite o titulo e descrição do seu recado"
        title="Crie o seu recado"
      />
      <Grid container>
        <Grid item xs={12} m={5}>
          <Container>
            <Typography variant="h4">Meus recados:</Typography>
            <Divider />
          </Container>
        </Grid>

        {userLoggedTasks.map((task) => (
          <Grid item xs={12} md={6} lg={3}>
            <Container sx={{ marginTop: '20px' }}>
              <BasicCard key={task?.id} title={task?.task} detail={task?.detail} time={task?.time} date={task?.date} />
            </Container>
          </Grid>
        ))}
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        size="small"
        sx={{ position: 'fixed', right: '20px', bottom: '20px' }}
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default Notes;
