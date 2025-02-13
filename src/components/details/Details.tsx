import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Button from '../button/Button';
// import Loader from '../loader/Loader';
import styles from './Details.module.css';
import { useOutletContext } from 'react-router-dom';

const Details = () => {
  const planet = useSelector(
    (state: RootState) => state.planets.selectedPlanet
  );
  const { closeDetails } = useOutletContext<{ closeDetails: () => void }>();

  if (!planet) {
    return;
  }
  const {
    name,
    climate,
    diameter,
    gravity,
    terrain,
    orbital_period,
    population,
  } = planet;

  const detailsObj = { diameter, gravity, orbital_period, population };

  const detailList = Object.entries(detailsObj).map(([key, value], idx) => (
    <li key={`${key}-${idx}`} className={styles.detailsItem}>
      <span className={styles.detail}>{key}:</span>
      <span>{value}</span>
    </li>
  ));

  return (
    <div className={styles.detailsWrap}>
      <h1>{name}</h1>
      {/* {isLoading && <Loader />} */}
      <div>
        <span className={styles.shortDescription}>Short description:</span>
        <span>{` Planet with ${terrain} and ${climate} climate`}</span>
      </div>
      <h3>Details:</h3>
      <ul className={styles.detailsList}>{detailList}</ul>
      <div className={styles.closeBtnWrap}>
        <Button type="button" onClick={closeDetails}>
          Close details
        </Button>
      </div>
    </div>
  );
};

export default Details;
