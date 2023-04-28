import React from 'react';
import { Grid } from '@mui/material';
import ResponsiveAppBar from '../../../components/ResponsiveAppBar';

interface LoggedLayoutProps {
  component: React.FC;
  mode: 'loggedOut' | 'loggedIn';
}

const LoggedLayout: React.FC<LoggedLayoutProps> = ({ component: Component, mode }) => (
  <Grid container justifyContent="space-between" height="100vh">
    <Grid item xs={12} height="9%">
      <ResponsiveAppBar mode={mode} />
    </Grid>
    <Grid item xs={12} height="91%">
      <Component />
    </Grid>
  </Grid>
);

export default LoggedLayout;
