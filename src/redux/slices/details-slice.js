import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { loadCountryDetails, loadCountryNeighbours } from '../api';

export const getCountryDetails = createAsyncThunk('@@details/getCountryDetails', async (name) => {
  return await loadCountryDetails(name);
});

export const getCountryNeighbours = createAsyncThunk(
  '@@details/getCountryNeighbours',
  async (codes) => {
    return await loadCountryNeighbours(codes);
  }
);

const initialState = {
  currentCountry: null,
  neighbours: [],
  status: 'idle',
  error: null,
};

const detailsSlice = createSlice({
  name: '@@details',
  initialState,
  reducers: {
    resetDetails: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountryDetails.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.currentCountry = action.payload[0];
      })
      .addCase(getCountryNeighbours.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.neighbours = action.payload.map((country) => country.name.common);
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'rejected';
          state.error = action.payload || action.meta.error;
        }
      );
  },
});

export const { resetDetails } = detailsSlice.actions;

export const detailsReducer = detailsSlice.reducer;

export const selectCurrentCountry = (state) => state.details.currentCountry;
export const selectDetails = (state) => state;
export const selectNeighbours = (state) => state.details.neighbours;
