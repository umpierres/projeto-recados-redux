import AddIcon from '@mui/icons-material/Add';

import {
  Container, Divider, Fab, Grid, Card, CardActions, CardContent, Typography, IconButton,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

import ModalDelete from '../components/ModalDelete';
import ModalCreate from '../components/ModalCreate';
import ModalEdit from '../components/ModalEdit';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { SelectAllTasks, editTask } from '../store/modules/tasksSlice';
import TaskType from '../types/taskType';
import AlertComponent from '../components/Alert';

const Notes: React.FC = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);
  const [showAlert, setShowAlert] = useState({ success: false, text: '', display: 'none' });

  const rememberedLoggedUser = useAppSelector((state) => state.loggedUser.user);

  const dispatch = useAppDispatch();
  const userLoggedTasks = useAppSelector(SelectAllTasks).filter((task) => task.owner === rememberedLoggedUser.email);

  const handleClose = () => {
    setOpenModal(false);
    setOpenModalDelete(false);
    setOpenModalEdit(false);
  };

  const actionConfirm = () => {
    setOpenModal(false);
    setOpenModalEdit(false);
  };

  const handleEdit = (task: TaskType) => {
    setEditingTask(task);
    setOpenModalEdit(true);
  };

  const handleToggleFavorite = (id: number) => {
    const task = userLoggedTasks.find((taskExist) => taskExist.id === id);
    if (task) {
      dispatch(
        editTask({
          ...task,
          favorite: !task.favorite,
        }),
      );
    }
  };
  const favoriteTasks = useMemo(() => userLoggedTasks?.filter((item) => item.favorite === true), [userLoggedTasks]);

  useEffect(() => {
    if (rememberedLoggedUser.email === '') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <AlertComponent success={showAlert.success} text={showAlert.text} display={showAlert.display} />
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
            <Typography variant="h4">Meus Favoritos:</Typography>
            <Divider />
          </Container>
        </Grid>

        {favoriteTasks.map((task) => (
          <Grid item xs={12} md={6} lg={3} key={task?.id}>
            <ModalDelete openModal={openModalDelete} actionCancel={handleClose} TaskId={task?.id} />
            <ModalEdit task={editingTask || task} open={openModalEdit} actionCancel={handleClose} actionConfirm={actionConfirm} />
            <Container sx={{ marginTop: '20px' }}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {task.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5, wordBreak: 'break-all' }} color="text.secondary">
                    {task.date}
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                    {task.detail}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton color={task.favorite ? 'error' : 'inherit'} onClick={() => handleToggleFavorite(task.id)}>
                    {task.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={() => {
                      handleEdit(task);
                    }}
                  >
                    <EditIcon sx={{ color: 'text.secondary' }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setOpenModalDelete(true);
                    }}
                  >
                    <DeleteIcon sx={{ color: 'text.secondary' }} />
                  </IconButton>
                </CardActions>
              </Card>
            </Container>
          </Grid>
        ))}
        <Grid item xs={12} sx={{ position: 'fixed', bottom: '20px', right: '50%' }} />
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
