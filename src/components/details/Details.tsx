import Loader from '../loader/Loader';
import Button from '../button/Button';
import { useDetails } from '../../hooks/useDetails';
import styles from './Details.module.css';

const Details = () => {
  const { data, name, loadingDetails, closeDetails } = useDetails();
  const { climate, diameter, gravity, terrain, orbital_period, population } =
    data;
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
      {loadingDetails && <Loader />}
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
