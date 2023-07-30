import React from 'react';
import { Alert } from '@mui/material';
import { useAppSelector } from '../store/hooks';

const AlertComponent: React.FC = () => {
  const alert = useAppSelector((state) => state.alert);

  return (
    <Alert
      sx={{
        display: alert.display,
        position: 'absolute',
        top: '10%',
        right: '1%',
      }}
      severity={alert.type}
    >
      {alert.message}
    </Alert>
  );
};

export default AlertComponent;
