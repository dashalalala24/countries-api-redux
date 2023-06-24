const BASE_URL = 'https://restcountries.com/v3.1/';

const ALL_COUNTRIES = BASE_URL + 'all?fields=name,capital,flags,population,region';

const searchByCountry = (name) => BASE_URL + 'name/' + name;

const filterByCode = (codes) => BASE_URL + 'alpha?codes=' + codes.join(',');

export const loadAllCountries = async () => {
  const res = await fetch(ALL_COUNTRIES);
  const data = await res.json();

  return data;
};

export const loadCountryDetail = async (name) => {
  const res = await fetch(searchByCountry(name));
  const data = await res.json();

  return data;
};

export const loadCountryNeighbours = async (codes) => {
  const res = await fetch(filterByCode(codes));
  const data = await res.json();

  return data;
};
