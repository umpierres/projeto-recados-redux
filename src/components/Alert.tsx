import React from 'react';
import { Alert } from '@mui/material';

interface AlertComponentProps {
  text: string;
  success: boolean;
  display: string;
}

const AlertComponent: React.FC<AlertComponentProps> = ({ text, success, display }) => (
  <Alert
    sx={{
      display,
      position: 'absolute',
      top: '10%',
      right: '1%',
    }}
    severity={success ? 'success' : 'error'}
  >
    {text}
  </Alert>
);

export default AlertComponent;
