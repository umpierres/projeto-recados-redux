import React from 'react';
import { Grid } from '@mui/material';
import ResponsiveAppBar from '../../../components/ResponsiveAppBar';

interface DefaultLayoutProps {
  component: React.FC;
  mode: 'loggedOut' | 'loggedIn';
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ component: Component, mode }) => (
  <Grid container justifyContent="space-between" height="100vh">
    <Grid item xs={12}>
      <ResponsiveAppBar mode={mode} />
    </Grid>
    <Grid item xs={12}>
      <Component />
    </Grid>
  </Grid>
);

export default DefaultLayout;
