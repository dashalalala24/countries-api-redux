import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoArrowBack } from 'react-icons/io5';
import { Button } from '../components/Button';
import { Info } from '../components/Info';
import { selectCurrentCountry, selectDetails } from '../store/details/details-selectors';
import { useEffect } from 'react';
import { loadCountryDetails, resetDetails } from '../store/details/details-actions';

export const Details = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector(selectDetails);
  const country = useSelector(selectCurrentCountry);

  useEffect(() => {
    dispatch(loadCountryDetails(name));

    console.log('mount');

    return () => {
      dispatch(resetDetails());
      console.log('unmount');
    };
  }, [name]);

  return (
    <div>
      {status === 'loading' ? <h2>Loading...</h2> : null}
      {error ? <h2>{error}</h2> : null}
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      {country ? <Info props={country} /> : null}
    </div>
  );
};
