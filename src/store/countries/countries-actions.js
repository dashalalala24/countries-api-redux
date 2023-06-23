import { ALL_COUNTRIES } from '../../config';

const SET_COUNTRIES = '@@countries/SET_COUNTRIES';
const SET_LOADING = '@@countries/SET_LOADING';
const SET_ERROR = '@@countries/SET_ERROR';

const setCountries = (countries) => ({
  type: SET_COUNTRIES,
  payload: countries,
});

const setLoading = () => ({
  type: SET_LOADING,
});

const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

const loadCountries = () => (dispatch) => {
  dispatch(setLoading());

  fetch(ALL_COUNTRIES)
    .then((res) => res.json())
    .then((data) => dispatch(setCountries(data)))
    .catch((err) => dispatch(setError(err.message)));
};

export { SET_COUNTRIES, SET_LOADING, SET_ERROR, setCountries, setLoading, setError, loadCountries };
