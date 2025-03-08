import { useOutletContext } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { getShortDescription } from '../../utils/getShortDescription';
import Button from '../button/Button';
import styles from './Details.module.css';

const Details = () => {
  const { closeDetails } = useOutletContext<{ closeDetails: () => void }>();
  const planet = useAppSelector(state => state.planets.selectedPlanet);

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
      <div>
        <span className={styles.shortDescription}>Short description: </span>
        <span>{getShortDescription(terrain, climate)}</span>
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
