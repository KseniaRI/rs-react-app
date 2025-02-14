import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  setCheckedPlanets,
  setSelectedPlanet,
} from '../../features/api/planetsSlice';
import { RootState } from '../../app/store';
import { Planet } from '../../types';
import Loader from '../loader/Loader';
import styles from './Results.module.css';

const ResultsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '';

  const planets = useSelector((state: RootState) => state.planets.planets);
  const isPlanetsListLoading = useSelector(
    (state: RootState) => state.planets.isLoading
  );
  const checkedPlanets = useSelector(
    (state: RootState) => state.planets.checkedPlanets
  );

  const onItemClick = (name: string) => {
    setSearchParams({
      page,
      details: name,
    });
    navigate(`/planet?page=${page}&details=${name}`);
    const planet = planets.find(el => el.name === name);
    if (planet) {
      dispatch(setSelectedPlanet(planet));
    }
  };

  const onCheckboxChange = (planet: Planet) => {
    dispatch(setCheckedPlanets([...checkedPlanets, planet]));
  };

  return (
    <ul className={styles.resultsList}>
      {isPlanetsListLoading && <Loader />}
      {planets.map(planet => (
        <li
          className={styles.resultsItem}
          key={planet.name}
          onClick={() => onItemClick(planet.name)}
        >
          <div className={styles.inputWrap}>
            <input
              onClick={e => e.stopPropagation()}
              type="checkbox"
              onChange={() => onCheckboxChange(planet)}
              checked={checkedPlanets.some(pl => pl.name === planet.name)}
            />
            <p className={styles.resultName}>{planet.name}</p>
          </div>
          <p>{` Planet with ${planet.terrain} and ${planet.climate} climate`}</p>
        </li>
      ))}
    </ul>
  );
};

export default ResultsList;
