import { ALL_COUNTRIES, searchByCountry, filterByCode } from '../config';

const checkRes = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res);
  }
};

const fetchData = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => checkRes(res));
};

export const loadAllCountries = () => {
  return fetchData(ALL_COUNTRIES);
};

export const loadCountryDetails = (name) => {
  return fetchData(searchByCountry(name));
};

export const loadCountryNeighbours = (codes) => {
  return fetchData(filterByCode(codes));
};
