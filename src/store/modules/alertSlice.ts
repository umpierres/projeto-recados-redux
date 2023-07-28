import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ShowAlertProps {
  display: 'show' | 'none';
  message: string;
  type: 'warning' | 'error' | 'success';
}

const initialState: ShowAlertProps = {
  display: 'none',
  message: '',
  type: 'warning',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<ShowAlertProps>) => ({
      display: 'show',
      message: action.payload.message,
      type: action.payload.type,
    }),
    hideAlert: (state, action: PayloadAction<ShowAlertProps>) => ({
      display: 'none',
      message: action.payload.message,
      type: action.payload.type,
    }),
  },
});
export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
