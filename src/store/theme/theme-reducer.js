import { TOGGLE_THEME } from './theme-actions';

export const themeReducer = (state = 'light', { type, payload }) => {
  switch (type) {
    case TOGGLE_THEME: {
      return payload;
    }
    default: {
      return state;
    }
  }
};
