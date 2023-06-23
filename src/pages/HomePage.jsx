import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { List } from '../components/List';
import { Card } from '../components/Card';
import { Controls } from '../components/Controls';
import { loadCountries } from '../store/countries/countries-actions';
import {
  selectAllCountries,
  selectCountriesInfo,
  selectSearchedCountries,
  selectCountriesByRegion,
} from '../store/countries/countries-selectors';
import { selectRegion, selectSearch, selectControls } from '../store/controls/controls-selectors';

import { loadCountryDetails } from '../store/details/details-actions';

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { search, region } = useSelector(selectControls);

  const countries = useSelector((state) => selectSearchedCountries(state, { search, region }));
  const { status, error, quantity } = useSelector(selectCountriesInfo);

  useEffect(() => {
    if (!quantity) {
      dispatch(loadCountries());
    }
  }, [quantity]);

  return status === 'fullfiled' ? (
    <>
      <Controls />
      {error ? <h2>{error}</h2> : null}
      {status === 'loading' ? <h2>Loading...</h2> : null}
      <List>
        {countries.map((c) => {
          const countryInfo = {
            img: c.flags.svg,
            name: c.name.common,
            info: [
              {
                title: 'Population',
                description: c.population.toLocaleString(),
              },
              {
                title: 'Region',
                description: c.region,
              },
              {
                title: 'Capital',
                description: c.capital,
              },
            ],
          };

          return (
            <Card
              key={c.name.common}
              onClick={() => {
                navigate(`/country/${c.name.common}`);
              }}
              {...countryInfo}
            />
          );
        })}
      </List>
    </>
  ) : null;
};
