import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Form } from '../components/Form';
import { useAppSelector } from '../store/hooks';

const alignCenter = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const rememberedUser = useAppSelector((state) => state.userRemembered.user);
  useEffect(() => {
    if (!(rememberedUser.email === '')) {
      navigate('/notes');
    }
  }, [navigate]);
  return (
    <Grid container sx={alignCenter}>
      <Grid item xs={12} md={4} lg={3}>
        <Form mode="signin" textButton="Enviar" textTitle="FAÇA LOGIN" />
      </Grid>
    </Grid>
  );
};

export default SignIn;
