import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../api';

const BASE_URL = 'https://restcountries.com/v3.1/';

const ALL_COUNTRIES = BASE_URL + 'all?fields=name,capital,flags,population,region';

export const getAllCountries = createAsyncThunk('@@countries/getAllCountries', async () => {
  try {
    const response = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region'
    );
    if (!response.ok) {
      return response.status;
    }
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    return error.message;
  }
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
