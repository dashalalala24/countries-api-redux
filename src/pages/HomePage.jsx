import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { List } from '../components/List';
import { Card } from '../components/Card';
import { Controls } from '../components/Controls';
import {
  selectAllCountries,
  selectCountriesInfo,
  selectSearchedCountries,
  getAllCountries,
} from '../redux/slices/countries-slice';
import { selectControls } from '../redux/slices/controls-slice';

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const controls = useSelector(selectControls);

  const countries = useSelector((state) => selectSearchedCountries(state, controls));

  // const countries = useSelector((state) => selectAllCountries(state));

  const { status, error, quantity } = useSelector(selectCountriesInfo);

  console.log(countries);

  useEffect(() => {
    if (!quantity) {
      dispatch(getAllCountries());
    }
  }, [quantity]);

  return status === 'fulfilled' ? (
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
