import {
  Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addUser, SelectAllUsers, SelectUserByEmail } from '../store/modules/usersSlice';
import UserType from '../types/userType';
import { setRememberedUser } from '../store/modules/loggedUserSlice';
import AlertComponent from './Alert';

interface FormProps {
  mode: 'signin' | 'signup';
  textButton: string;
  textTitle: string;
}

export const Form: React.FC<FormProps> = ({ mode, textButton, textTitle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [disabled, setDisable] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorRepassword, setErrorRepassword] = useState(false);
  const [showAlert, setShowAlert] = useState({ success: false, text: '', display: 'none' });
  const dispatch = useAppDispatch();

  const listUsersRedux = useAppSelector(SelectAllUsers);
  const rememberedUser = useAppSelector((state) => state.loggedUser.user);
  const existUser = useAppSelector((state) => SelectUserByEmail(state, email));

  const navigate = useNavigate();

  useEffect(() => {
    // redirecionamento do remember
    if (rememberedUser.remember) {
      navigate('/notes');
    }
  }, [navigate]);

  if (!rememberedUser.remember) {
    const cleanUser = {
      email: '',
      password: '',
      tasks: [],
      remember: false,
    };
    dispatch(setRememberedUser(cleanUser));
  }

  useEffect(() => {
    // Validação de entradas login
    if (mode === 'signup') {
      const emailValid = email.endsWith('.com') || (email.endsWith('.com.br') && email.includes('@'));

      const passwordValid = password.length >= 6;
      const repasswordValid = password === repassword;

      if (email.length > 0) {
        setErrorEmail(!emailValid);
      }

      if (password.length > 0) {
        setErrorPassword(!passwordValid);
      }

      if (repassword.length > 0) {
        setErrorRepassword(!repasswordValid);
      }
      setDisable(!(emailValid && passwordValid && repasswordValid));
    }
  }, [email, password, repassword, mode]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode === 'signup') {
      const newUser: UserType = {
        email,
        password,
        remember,
      };

      if (existUser) {
        setShowAlert({
          display: 'show',
          success: false,
          text: 'Esse e-mail já está cadastrado!',
        });
        setTimeout(() => {
          setShowAlert({ display: 'none', success: true, text: '' });
        }, 1000);
        return;
      }
      dispatch(addUser(newUser));

      setShowAlert({ display: 'show', success: true, text: 'Usuario criado com sucesso' });
      setEmail('');
      setPassword('');
      setRepassword('');

      setTimeout(() => {
        setShowAlert({ display: 'none', success: true, text: '' });
      }, 1000);
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    } else {
      // até aqui tá ok

      const userFound = listUsersRedux.find((user) => user.email === email);
      if (!userFound) {
        setShowAlert({
          display: 'show',
          success: false,
          text: 'E-mail ou senha inválidos!',
        });
        setTimeout(() => {
          setShowAlert({ display: 'none', success: true, text: '' });
        }, 1000);
        return;
      }
      dispatch(setRememberedUser({ email: userFound.email, password: userFound.password, remember }));
      navigate('/notes');
    }
  }

  return (
    <Box>
      <AlertComponent success={showAlert.success} text={showAlert.text} display={showAlert.display} />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          m: 3,
        }}
      >
        <Paper elevation={3}>
          <Box sx={{ p: 10 }} component="form" onSubmit={(e) => handleSubmit(e)}>
            <Typography variant="h4" textAlign="center">
              {textTitle}
            </Typography>
            <Box sx={{ mt: 5 }}>
              <TextField
                sx={{ my: 1 }}
                error={errorEmail}
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="standard-error-helper-text"
                label="E-mail"
                helperText={errorEmail ? 'E-mail inválido' : ''}
                fullWidth
                variant="standard"
                type="email"
              />
              <TextField
                sx={{ my: 1 }}
                error={errorPassword}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                id="standard-error-helper-text"
                label="Senha"
                helperText={errorPassword ? 'A senha deve ter no mínimo 6 caractéres' : ''}
                fullWidth
                variant="standard"
                type="password"
              />
              {mode === 'signup' ? (
                <TextField
                  sx={{ my: 1 }}
                  error={errorRepassword}
                  value={repassword}
                  required
                  onChange={(e) => setRepassword(e.target.value)}
                  id="standard-error-helper-text"
                  label="Repita a Senha"
                  helperText={errorRepassword ? 'As senhas não são iguais' : ''}
                  fullWidth
                  variant="standard"
                  type="password"
                />
              ) : (
                <FormControlLabel
                  control={<Checkbox checked={remember} onChange={(evento) => setRemember(evento.target.checked)} />}
                  label="Permanecer conectado"
                />
              )}
              <Button disabled={disabled} type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
                {textButton}
              </Button>
              <Grid container>
                <Grid item xs={12} textAlign="center">
                  {mode === 'signin' ? (
                    <Typography variant="body2">
                      <Link style={{ color: 'inherit' }} to="/signup">
                        Não tem uma conta? Cadastre-se
                      </Link>
                    </Typography>
                  ) : (
                    <Typography variant="body2">
                      <Link style={{ color: 'inherit' }} to="/signin">
                        Já possui conta? Vá para Login
                      </Link>
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
