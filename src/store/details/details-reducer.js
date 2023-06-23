import {
  SET_DETAILS,
  SET_LOADING,
  SET_ERROR,
  RESET_DETAILS,
  SET_NEIGHBOURS,
} from './details-actions';

const inititalState = {
  currentCountry: null,
  status: 'idle',
  error: null,
  neighbours: [],
};

export const detailsReducer = (state = inititalState, { type, payload }) => {
  switch (type) {
    case SET_DETAILS: {
      return {
        ...state,
        currentCountry: payload,
        status: 'fullfiled',
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        error: null,
        status: 'loading',
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        error: payload,
        status: 'failed',
      };
    }
    case RESET_DETAILS: {
      return inititalState;
    }
    case SET_NEIGHBOURS: {
      return {
        ...state,
        neighbours: payload,
      };
    }
    default: {
      return state;
    }
  }
};
