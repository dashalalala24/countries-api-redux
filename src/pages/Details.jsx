import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoArrowBack } from 'react-icons/io5';
import { Button } from '../components/Button';
import { Info } from '../components/Info';
import { useEffect } from 'react';
import {
  getCountryDetails,
  resetDetails,
  selectCurrentCountry,
  selectDetails,
} from '../redux/slices/details-slice';

export const Details = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, error } = useSelector(selectDetails);
  const country = useSelector(selectCurrentCountry);

  useEffect(() => {
    dispatch(getCountryDetails(name));

    return () => {
      dispatch(resetDetails());
    };
  }, [name]);

  return (
    <div>
      {status === 'loading' ? <h2>Loading...</h2> : null}
      {error ? <h2>{error}</h2> : null}
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      {country ? <Info props={country}></Info> : null}
    </div>
  );
};
