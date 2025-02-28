import { useRouter } from 'next/router';
import Button from '../button/Button';
import ResultsList from './ResultsList';
import Flyout from '../flyout/Flyout';
import Details from '../details/Details';
import styles from './Results.module.css';

const Results = () => {
  const router = useRouter();
  const { details, ...restQuery } = router.query;

  const closeDetails = () => {
    router.push({
      pathname: router.pathname,
      query: restQuery,
    });
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
      {details && <Details closeDetails={closeDetails} />}
    </div>
  );
};

export default Results;
