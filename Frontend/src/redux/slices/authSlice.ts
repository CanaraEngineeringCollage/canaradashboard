// redux/slices/adminSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
  name: string;
  email: string;
}

const initialState: AdminState = {
  name: '',
  email: '',
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<AdminState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearAdmin: (state) => {
      state.name = '';
      state.email = '';
    },
  },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
