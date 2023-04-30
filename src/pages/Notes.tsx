import AddIcon from '@mui/icons-material/Add';

import {
  Container, Divider, Fab, Grid, Button, Card, CardActions, CardContent, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import ModalDelete from '../components/ModalDelete';
import { ModalCreate } from '../components/ModalCreate';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { SelectAllTasks, removeTask } from '../store/modules/tasksSlice';

const Notes: React.FC = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const rememberedLoggedUser = useAppSelector((state) => state.loggedUser.user);

  const allTasks = useAppSelector(SelectAllTasks);
  const dispatch = useAppDispatch();

  const handleDelete = (id: number) => {
    dispatch(removeTask(id));
    setOpenModalDelete(false);
  };

  const userLoggedTasks = allTasks.filter((task) => task?.owner === rememberedLoggedUser.email);

  useEffect(() => {
    if (rememberedLoggedUser.email === '') {
      navigate('/');
    }
  }, [navigate]);

  const handleClose = () => {
    setOpenModal(false);
    setOpenModalDelete(false);
  };

  const actionConfirm = () => {
    setOpenModal(false);
  };

  return (
    <>
      <ModalCreate
        open={openModal}
        actionCancel={handleClose}
        actionConfirm={actionConfirm}
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
          <Grid item xs={12} md={6} lg={3} key={task?.id}>
            <ModalDelete openModal={openModalDelete} actionCancel={handleClose} removeTask={handleDelete} id={task?.id} />
            <Container sx={{ marginTop: '20px' }}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {task.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {task.date}
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                    {task.detail}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">
                    <FavoriteIcon sx={{ color: 'text.secondary' }} />
                  </Button>
                  <Button size="small">
                    <EditIcon sx={{ color: 'text.secondary' }} />
                  </Button>
                  <Button
                    size="small"
                    onClick={() => {
                      setOpenModalDelete(true);
                    }}
                  >
                    <DeleteIcon sx={{ color: 'text.secondary' }} />
                  </Button>
                </CardActions>
              </Card>
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
