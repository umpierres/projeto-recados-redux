import React from 'react';

import { Grid } from '@mui/material';
import { Form } from '../components/Form';

const alignCenter = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const SignIn: React.FC = () => (
  <Grid container sx={alignCenter}>
    <Grid item xs={12} md={4} lg={3}>
      <Form mode="signin" textButton="Enviar" textTitle="FAÇA LOGIN" />
    </Grid>
  </Grid>
);

export default SignIn;
