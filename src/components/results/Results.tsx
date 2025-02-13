import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { Planet } from '../../types';
import styles from './Results.module.css';
import Button from '../button/Button';
// import Loader from '../loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setSelectedPlanet } from '../../features/api/planetsSlice';

const Results = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchParams.get('page') ?? '';
  const hasDetails = searchParams.has('details');

  const planets: Planet[] = useSelector(
    (state: RootState) => state.planets.planets
  );
  const closeDetails = () => {
    navigate(`/?page=${page}`);
  };

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

  const dataList = planets.map(({ name, terrain, climate }) => (
    <li
      className={styles.resultsItem}
      key={name}
      onClick={() => onItemClick(name)}
    >
      <p className={styles.resultName}>{name}</p>
      <p>{` Planet with ${terrain} and ${climate} climate`}</p>
    </li>
  ));

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.resultsLeftSection}>
        <div className={styles.resultsHeading}>
          <p>Name</p>
          <p>Description</p>
        </div>
        <ul className={styles.resultsList}>
          {/* {(isLoading || isUninitialized) && <Loader />} */}
          {dataList}
          {/* {isError && <p>Error</p>} */}
        </ul>
        {hasDetails && (
          <div className={styles.closeBtnWrap}>
            <Button type="button" onClick={closeDetails}>
              Close details
            </Button>
          </div>
        )}
      </div>
      <Outlet context={{ closeDetails }} />
    </div>
  );
};

export default Results;
