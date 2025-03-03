'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button from '../button/Button';
import ResultsList from './ResultsList';
import Flyout from '../flyout/Flyout';
import Details from '../details/Details';
import styles from './Results.module.css';

const Results = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const details = searchParams.get('details');

  const closeDetails = () => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.delete('details');
    router.push(`${pathname}?${updatedParams}`);
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
