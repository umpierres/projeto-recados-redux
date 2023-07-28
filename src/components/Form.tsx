import {
  Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { addUser } from '../store/modules/userSlice';
import UserType from '../types/UserType';
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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    } else if (mode === 'signin') {
      const emailValid = email.endsWith('.com') || (email.endsWith('.com.br') && email.includes('@'));
      const passwordValid = password.length > 3;
      if (email.length > 0) {
        setErrorEmail(!emailValid);
      }
      setDisable(!(emailValid && passwordValid));
    }
  }, [email, password, repassword, mode]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode === 'signup') {
      const newUser: UserType = {
        id: 's',
        email,
        password,
        remember,
      };

      /* dispatch(addUser(newUser)); */

      setEmail('');
      setPassword('');
      setRepassword('');
    } else {
      // colocar o usuario logado
      navigate('/notes');
    }
  }

  return (
    <Box>
      <AlertComponent />
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
