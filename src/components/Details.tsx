import Loader from './Loader';
import Button from './Button';
import { useDetails } from '../hooks/useDetails';

const Details = () => {
  const { data, name, loadingDetails, closeDetails } = useDetails();
  const { climate, diameter, gravity, terrain, orbital_period, population } =
    data;
  const detailsObj = { diameter, gravity, orbital_period, population };
  const detailList = Object.entries(detailsObj).map(([key, value], idx) => (
    <li key={`${key}-${idx}`}>
      <span>{key}:</span>
      <span>{value}</span>
    </li>
  ));
  return (
    <div>
      <h1>{name}</h1>
      {loadingDetails && <Loader />}
      <div>
        <span>Short description:</span>
        <span>{` Planet with ${terrain} and ${climate} climate`}</span>
      </div>
      <ul>{detailList}</ul>
      <Button type="button" onClick={closeDetails}>
        Close details
      </Button>
    </div>
  );
};

export default Details;
