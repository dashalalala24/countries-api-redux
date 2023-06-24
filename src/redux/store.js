import { configureStore } from '@reduxjs/toolkit';

import { themeReducer } from './slices/theme-slice';
import { controlsReducer } from './slices/controls-slice';

import * as api from './api';
import { countriesReducer } from './slices/countries-slice';
import { detailsReducer } from './slices/details-slice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    controls: controlsReducer,
    countries: countriesReducer,
    details: detailsReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { api },
      },
      serializableCheck: false,
    }),
});
