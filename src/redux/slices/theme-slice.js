import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: '@@theme',
  initialState: 'light',
  reducers: {
    toggleTheme: (_, action) => action.payload,
  },
});

export const { toggleTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
