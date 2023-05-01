import {
  Container, Divider, Pagination, Grid, Card, CardActions, CardContent, Typography, IconButton,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import ModalDelete from '../components/ModalDelete';
import ModalEdit from '../components/ModalEdit';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { SelectAllTasks, editTask } from '../store/modules/tasksSlice';
import TaskType from '../types/taskType';
import AlertComponent from '../components/Alert';

const Notes: React.FC = () => {
  const navigate = useNavigate();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskValue, setTaskValue] = useState<TaskType>({
    id: Date.now(),
    title: '',
    detail: '',
    favorite: false,
    date: '',
    owner: '',
  });
  const [showAlert, setShowAlert] = useState({ success: false, text: '', display: 'none' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const rememberedLoggedUser = useAppSelector((state) => state.loggedUser.user);

  const dispatch = useAppDispatch();
  const userLoggedTasks = useAppSelector(SelectAllTasks).filter((task) => task.owner === rememberedLoggedUser.email);
  const favoriteTasks = useMemo(() => userLoggedTasks?.filter((item) => item.favorite === true), [userLoggedTasks]);
  const currentTasks = favoriteTasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(favoriteTasks.length / itemsPerPage);

  const handleClose = () => {
    setOpenModalDelete(false);
    setOpenModalEdit(false);
  };

  const actionConfirm = () => {
    setOpenModalEdit(false);
    setShowAlert({ success: true, text: 'Recado adicionado com sucesso', display: 'block' });
    setTimeout(() => {
      setShowAlert({ display: 'none', success: true, text: '' });
    }, 1000);
  };

  const handleEdit = (task: TaskType) => {
    setTaskValue(task);
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

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    if (rememberedLoggedUser.email === '') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <AlertComponent success={showAlert.success} text={showAlert.text} display={showAlert.display} />
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
      <ModalDelete openModal={openModalDelete} actionCancel={handleClose} TaskId={taskValue.id} />
      <ModalEdit task={taskValue} open={openModalEdit} actionCancel={handleClose} actionConfirm={actionConfirm} />
    </>
  );
};

export default Notes;
