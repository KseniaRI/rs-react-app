import { useDispatch } from 'react-redux';
import {
  setCheckedPlanets,
  setSelectedPlanet,
} from '../../features/api/planetsSlice';
import { useAppSelector } from '../../app/hooks';
import { Planet } from '../../types';
import { getShortDescription } from '../../utils/getShortDescription';
import styles from './Results.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResultsItem = ({ planet }: { planet: Planet }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const search = searchParams.get('search') ?? '';

  const checkedPlanets = useAppSelector(state => state.planets.checkedPlanets);
  const planets = useAppSelector(state => state.planets.planets);

  const findCheckedIdx = (planet: Planet) =>
    checkedPlanets.findIndex(pl => pl.name === planet.name);

  const onCheckboxChange = (planet: Planet) => {
    const planetIdx = findCheckedIdx(planet);
    if (planetIdx === -1) {
      dispatch(setCheckedPlanets([...checkedPlanets, planet]));
    } else {
      const updatedCheckedPlanets = checkedPlanets.filter(
        (_, idx) => planetIdx !== idx
      );
      dispatch(setCheckedPlanets(updatedCheckedPlanets));
    }
  };

  const onItemClick = (name: string) => {
    navigate(`/planet?page=${page}&search=${search}&details=${name}`);
    const planet = planets.find(pl => pl.name === name);
    if (planet) {
      dispatch(setSelectedPlanet(planet));
    }
  };
  return (
    <li className={styles.resultsItem} onClick={() => onItemClick(planet.name)}>
      <div className={styles.inputWrap}>
        <input
          className={styles.resultsCheckbox}
          onClick={e => e.stopPropagation()}
          type="checkbox"
          onChange={() => onCheckboxChange(planet)}
          checked={checkedPlanets.some(pl => pl.name === planet.name)}
        />
        <p className={styles.resultName}>{planet.name}</p>
      </div>
      <p>{getShortDescription(planet.terrain, planet.climate)}</p>
    </li>
  );
};

export default ResultsItem;
