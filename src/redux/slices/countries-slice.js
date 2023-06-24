import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadAllCountries } from '../api';

export const getAllCountries = createAsyncThunk('@@countries/getAllCountries', async () => {
  return await loadAllCountries();
});

const initialState = {
  list: [],
  status: 'idle',
  error: null,
};

const countriesSlice = createSlice({
  name: '@@countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCountries.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllCountries.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(getAllCountries.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.list = action.payload;
      });
  },
});

export const countriesReducer = countriesSlice.reducer;

export const selectCountriesInfo = (state) => ({
  status: state.countries.status,
  error: state.countries.error,
  quantity: state.countries.list.length,
});

export const selectAllCountries = (state) => state.countries.list;

export const selectSearchedCountries = (state, { search = '', region = '' }) => {
  return state.countries.list.filter(
    (c) => c.region.includes(region) && c.name.common.toLowerCase().includes(search.toLowerCase())
  );
};
