import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppRoutes from './routes/AppRoutes';
import { StylesGlobal } from './config/styles/Styles';
import { AppThemeProvider } from './ThemeContext';
import { persistor, store } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppThemeProvider>
          <StylesGlobal />
          <AppRoutes />
        </AppThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
