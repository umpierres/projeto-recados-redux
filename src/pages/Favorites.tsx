import {
  Container, Divider, Pagination, Grid, Card, CardActions, CardContent, Typography, IconButton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import ModalDelete from '../components/ModalDelete';
import ModalEdit from '../components/ModalEdit';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import TaskType from '../types/TaskType';
import AlertComponent from '../components/Alert';
import { listTasks, toggleStatusTask } from '../store/modules/taskSlice';
import { logoutUser, setUser } from '../store/modules/userSlice';

const Favorites: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userState = useAppSelector((state) => state.user);
  const taskState = useAppSelector((state) => state.task);
  const [noteChanged, setNoteChanged] = useState<boolean>(false);
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
  const favoriteTasks = taskState.task.notes;

  useEffect(() => {
    const userLogged = localStorage.getItem('userLogged');

    if (!userLogged) {
      dispatch(logoutUser());
      return;
    }

    dispatch(setUser(JSON.parse(userLogged)));
  }, [dispatch]);

  useEffect(() => {
    if (userState.user.logged) {
      const ownerID = userState.user.id;
      setTimeout(() => {
        dispatch(
          listTasks({
            ownerID,
            filter: {},
          }),
        );
      }, 500);
    }
  }, [dispatch, userState.user, noteChanged]);

  const currentTasks = favoriteTasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(favoriteTasks.length / itemsPerPage);

  const handleClose = () => {
    setOpenModalDelete(false);
    setOpenModalEdit(false);
  };

  const actionConfirm = () => {
    setOpenModalEdit(false);
  };

  const handleEdit = (task: TaskType) => {
    setTaskValue(task);
    setOpenModalEdit(true);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <>
      <AlertComponent />
      <Grid container>
        <Grid item xs={12} m={5}>
          <Container>
            <Typography variant="h4">Meus Favoritos:</Typography>
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
      <ModalDelete
        toggleNoteChanged={() => setNoteChanged(!noteChanged)}
        openModal={openModalDelete}
        actionCancel={handleClose}
        ownerID={userState.user.id}
        noteID={taskValue.id!}
      />
      <ModalEdit
        toggleNoteChanged={() => setNoteChanged(!noteChanged)}
        open={openModalEdit}
        task={taskValue}
        actionCancel={handleClose}
        actionConfirm={actionConfirm}
      />
    </>
  );
};

export default Favorites;
