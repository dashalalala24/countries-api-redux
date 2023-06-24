import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getCountryNeighbours, selectNeighbours } from '../redux/slices/details-slice';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.section`
  margin-top: 3rem;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  gap: 2rem;

  @media (min-width: 767px) {
    grid-template-columns: minmax(100px, 400px) 1fr;
    align-items: center;
    gap: 5rem;
  }
  @media (min-width: 1024px) {
    grid-template-columns: minmax(400px, 600px) 1fr;
  }
`;

const InfoImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const InfoTitle = styled.h1`
  margin: 0;
  font-weight: var(--fw-normal);
`;

const ListGroup = styled.div`
  display: flex;
  flex-direction: column;

  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 4rem;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  line-height: 1.8;

  & > b {
    font-weight: var(--fw-bold);
  }
`;

const Meta = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  align-items: flex-start;

  & > b {
    font-weight: var(--fw-bold);
  }

  @media (min-width: 767px) {
    flex-direction: row;
    align-items: center;
  }
`;

const TagGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 0 1rem;
  background-color: var(--colors-ui-base);
  box-shadow: var(--shadow);
  line-height: 1.5;
  cursor: pointer;
`;

export const Info = (country) => {
  const {
    name = {},
    flags = {},
    capital,
    population,
    region,
    subregion,
    tld = [],
    currencies = {},
    languages = {},
    borders = [],
  } = country.props;

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const neighbours = useSelector(selectNeighbours);

  const getNativeName = () => {
    for (let key in name.nativeName) {
      const nameKey = key;
      return name.nativeName[nameKey].common;
    }
  };

  const getValues = (obj) => {
    const keys = Object.keys(obj);
    let values = [];
    obj === currencies
      ? keys.map((code) => values.push(' ' + obj[code].name))
      : keys.map((code) => values.push(' ' + obj[code]));

    return values;
  };

  useEffect(() => {
    if (borders.length) {
      dispatch(getCountryNeighbours(borders));
    }
  }, [borders]);

  return (
    <Wrapper>
      <InfoImage
        src={flags.svg}
        alt={flags.alt}
      />
      <div>
        <InfoTitle>{name.common}</InfoTitle>
        <ListGroup>
          <List>
            <ListItem>
              <b>Native Name:</b>{' '}
              {'nativeName' in name ? getNativeName() : 'there is no native name'}
            </ListItem>
            <ListItem>
              <b>Population:</b> {population} people
            </ListItem>
            <ListItem>
              <b>Region:</b> {region}
            </ListItem>
            <ListItem>
              <b>Sub Region:</b> {subregion ? subregion : 'there is no subregion'}
            </ListItem>
            <ListItem>
              <b>Capital:</b> {capital ? capital : 'there is no capital'}
            </ListItem>
          </List>
          <List>
            <ListItem>
              <b>Top Level Domain:</b>{' '}
              {tld.map((d) => (
                <span key={d}>{d} </span>
              ))}
            </ListItem>
            <ListItem>
              <b>Currency:</b>{' '}
              {Object.keys(currencies).length === 0
                ? 'there is no currency'
                : getValues(currencies).toString()}
            </ListItem>
            <ListItem>
              <b>Languages:</b>{' '}
              {Object.keys(languages).length === 0
                ? 'there are no languages'
                : getValues(languages).toString()}
            </ListItem>
          </List>
        </ListGroup>
        <Meta>
          <b>Border Countries</b>
          {!borders.length ? (
            <span>There are no border countries</span>
          ) : (
            <TagGroup>
              {neighbours.map((b) => (
                <Tag
                  key={b}
                  onClick={() => navigate(`/country/${b}`)}>
                  {b}
                </Tag>
              ))}
            </TagGroup>
          )}
        </Meta>
      </div>
    </Wrapper>
  );
};
