import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BASE_URL = 'https://restcountries.com/v3.1/';

export const ALL_COUNTRIES = BASE_URL + 'all?fields=name,capital,flags,population,region';

export const searchByCountry = (name) => BASE_URL + 'name/' + name;

export const filterByCode = (codes) => BASE_URL + 'alpha?codes=' + codes.join(',');

export const getCountryDetails = createAsyncThunk('@@details/getCountryDetails', async (name) => {
  try {
    const response = await fetch(searchByCountry(name));
    if (!response.ok) {
      return response.status;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
});

export const getCountryNeighbours = createAsyncThunk(
  '@@details/getCountryNeighbours',
  async (codes) => {
    try {
      const response = await fetch(filterByCode(codes));
      if (!response.ok) {
        return response.status;
      }
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      return error.message;
    }
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
      .addCase(getCountryDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getCountryDetails.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(getCountryDetails.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.currentCountry = action.payload[0];
      })
      .addCase(getCountryNeighbours.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(getCountryNeighbours.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getCountryNeighbours.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.neighbors = action.payload.map((country) => country.name);
      });
  },
});

export const { resetDetails } = detailsSlice.actions;

export const detailsReducer = detailsSlice.reducer;

export const selectCurrentCountry = (state) => state.details.currentCountry;
export const selectDetails = (state) => state;
export const selectNeighbours = (state) => state.details.neighbours;
