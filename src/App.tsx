import React from 'react';
import { Provider } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import { StylesGlobal } from './config/styles/styles';
import { AppThemeProvider } from './ThemeContext';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <StylesGlobal />
        <AppRoutes />
      </AppThemeProvider>
    </Provider>
  );
}

export default App;
