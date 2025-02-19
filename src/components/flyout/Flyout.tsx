import { useDispatch } from 'react-redux';
import { setCheckedPlanets } from '../../features/api/planetsSlice';
import { useAppSelector } from '../../app/hooks';
import { downloadCSV } from '../../utils/downloadCSV';
import Button from '../button/Button';
import styles from './Flyout.module.css';

const Flyout = () => {
  const dispatch = useDispatch();
  const checkedPlanets = useAppSelector(state => state.planets.checkedPlanets);

  if (checkedPlanets.length === 0) {
    return null;
  }

  return (
    <div className={styles.flyoutWrap}>
      <h3>{checkedPlanets.length} items were selected</h3>
      <Button type="button" onClick={() => dispatch(setCheckedPlanets([]))}>
        Unselect
      </Button>
      <Button type="button" onClick={() => downloadCSV(checkedPlanets)}>
        Download
      </Button>
    </div>
  );
};

export default Flyout;
