import { createTheme } from '@mui/material';

// Define as cores para o tema claro
const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#FF7700',
      contrastText: '#fff',
    },
    secondary: {
      main: '#00D2FF',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f6f3',
      paper: '#fff',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#424242',
      contrastText: '#fff',
    },
    secondary: {
      main: '#0093B3',
      contrastText: '#fff',
    },
    background: {
      default: '#262626',
      paper: '#424242',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

export { lightTheme, darkTheme };
