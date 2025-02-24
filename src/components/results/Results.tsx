import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../button/Button';
import ResultsList from './ResultsList';
import Flyout from '../flyout/Flyout';
import styles from './Results.module.css';

const Results = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '';
  const hasDetails = searchParams.has('details');

  const closeDetails = () => {
    navigate(`/?page=${page}`);
  };

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.resultsLeftSection}>
        <div className={styles.resultsHeading}>
          <p>Name</p>
          <p>Description</p>
        </div>
        <ResultsList />
        {hasDetails && (
          <div className={styles.closeBtnWrap}>
            <Button type="button" onClick={closeDetails}>
              Close details
            </Button>
          </div>
        )}
        <Flyout />
      </div>
      <Outlet context={{ closeDetails }} />
    </div>
  );
};

export default Results;
