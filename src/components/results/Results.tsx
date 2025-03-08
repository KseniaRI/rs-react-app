import { useNavigate, useSearchParams } from 'react-router';
import Button from '../button/Button';
import ResultsList from './ResultsList';
import Flyout from '../flyout/Flyout';
import styles from './Results.module.css';
import { Outlet } from 'react-router';

const Results = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const details = searchParams.get('details');

  const closeDetails = () => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.delete('details');
    navigate(`/?${updatedParams}`);
  };

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.resultsLeftSection}>
        <div className={styles.resultsHeading}>
          <p>Name</p>
          <p>Description</p>
        </div>
        <ResultsList />
        {details && (
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
