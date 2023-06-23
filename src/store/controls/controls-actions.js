export const SET_SEARCH = '@@search/SET_SEARCH';
export const SET_REGION = '@@search/SET_REGION';
export const RESET_CONTROLS = '@@search/RESET_CONTROLS';

export const setSearch = (search) => ({
  type: SET_SEARCH,
  payload: search,
});

export const setRegion = (region) => ({
  type: SET_REGION,
  payload: region,
});

export const resetControls = () => ({
  type: RESET_CONTROLS,
});
