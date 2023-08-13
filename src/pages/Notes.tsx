import AddIcon from '@mui/icons-material/Add';

import {
  Container, Divider, Fab, Grid, Card, CardActions, CardContent, Typography, IconButton, Pagination,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import ModalCreate from '../components/ModalCreate';
import ModalDelete from '../components/ModalDelete';
import ModalEdit from '../components/ModalEdit';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import TaskType from '../types/TaskType';
import AlertComponent from '../components/Alert';
import { logoutUser, setUser } from '../store/modules/userSlice';
import { listTasks, toggleStatusTask } from '../store/modules/taskSlice';

const Notes: React.FC = () => {
  const userState = useAppSelector((state) => state.user);
  const taskState = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskValue, setTaskValue] = useState<TaskType>({
    id: '',
    title: '',
    description: '',
    favorite: false,
    archived: false,
    date: '',
    ownerID: '',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;
  const userLoggedTasks = taskState.task.notes;
  const currentTasks = userLoggedTasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(userLoggedTasks.length / itemsPerPage);

  useEffect(() => {
    const userLogged = localStorage.getItem('userLogged');

    if (!userLogged) {
      dispatch(logoutUser());
      return;
    }

    dispatch(setUser(JSON.parse(userLogged)));
  }, [dispatch]);

  useEffect(() => {
    if (!userState.user.logged) {
      navigate('/');
    }
  }, [userState, navigate]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    if (userState.user.logged) {
      const ownerID = userState.user.id;
      dispatch(
        listTasks({
          ownerID,
          filter: {},
        }),
      );
    }
  }, [dispatch, userState, taskState.task.notes]);

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
    setTaskValue(task);
    setOpenModalEdit(true);
  };

  return (
    <>
      <AlertComponent />
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

        {currentTasks.map((task) => (
          <Grid item xs={12} md={6} lg={3} key={task?.id}>
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
                    {task.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    color={task.favorite ? 'error' : 'inherit'}
                    onClick={() => {
                      dispatch(toggleStatusTask({ ownerID: userState.user.id, noteID: task.id!, action: 'favorite' }));
                    }}
                  >
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
                      setTaskValue(task);
                    }}
                  >
                    <DeleteIcon sx={{ color: 'text.secondary' }} />
                  </IconButton>
                </CardActions>
              </Card>
            </Container>
          </Grid>
        ))}

        <Grid item xs={12} position="fixed" right="50%" bottom="20px">
          <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
        </Grid>
      </Grid>

      <ModalDelete openModal={openModalDelete} actionCancel={handleClose} ownerID={userState.user.id} noteID={taskValue.id!} />
      <ModalEdit open={openModalEdit} task={taskValue} actionCancel={handleClose} actionConfirm={actionConfirm} />

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
