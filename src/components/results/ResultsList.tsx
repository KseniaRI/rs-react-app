import { useAppSelector } from '../../app/hooks';
import Loader from '../loader/Loader';
import styles from './Results.module.css';
import ResultsItem from './ResultsItem';

const ResultsList = () => {
  const planets = useAppSelector(state => state.planets.planets);
  const isLoading = useAppSelector(state => state.planets.isLoading);

  return (
    <ul className={styles.resultsList}>
      {isLoading && (
        <div className={styles.loaderWrap}>
          <Loader />
        </div>
      )}
      {planets.length === 0 && <p>No planets are present</p>}
      {planets.map(planet => (
        <ResultsItem planet={planet} key={planet.name} />
      ))}
    </ul>
  );
};

export default ResultsList;
