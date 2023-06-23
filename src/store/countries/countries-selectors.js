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
