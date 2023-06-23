// import { searchByCountry } from '../../config';

export const SET_DETAILS = '@@details/SET_DETAILS';
export const SET_LOADING = '@@details/SET_LOADING';
export const SET_ERROR = '@@details/SET_ERROR';
export const RESET_DETAILS = '@@details/RESET_DETAILS';
export const SET_NEIGHBOURS = '@@details/SET_NEIGHBOURS';

export const setDetails = (country) => ({
  type: SET_DETAILS,
  payload: country,
});

export const setLoading = () => ({
  type: SET_LOADING,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const resetDetails = () => ({
  type: RESET_DETAILS,
});

const setNeighbours = (neighbours) => ({
  type: SET_NEIGHBOURS,
  payload: neighbours,
});

export const loadCountryDetails =
  (name) =>
  (dispatch, _, { api }) => {
    dispatch(setLoading());

    fetch(api.searchByCountry(name))
      .then((res) => res.json())
      .then((data) => dispatch(setDetails(data[0])))
      .catch((error) => dispatch(setError(error.message)));
  };

export const loadNeighbours =
  (codes) =>
  (dispatch, _, { api }) => {
    dispatch(setLoading());

    fetch(api.filterByCode(codes))
      .then((res) => res.json())
      .then((data) => dispatch(setNeighbours(data.map((country) => country.name.common))))
      .catch((error) => console.error(error.message));
  };
