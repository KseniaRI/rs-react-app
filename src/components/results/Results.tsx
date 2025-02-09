import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { DataType } from '../../types';
import styles from './Results.module.css';
import Button from '../button/Button';

interface ResultsProps {
  data: DataType[];
}
const Results = ({ data }: ResultsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchParams.get('page') ?? '';
  const hasDetails = searchParams.has('details');

  const closeDetails = () => {
    navigate(`/?page=${page}`);
  };

  const onItemClick = (name: string) => {
    setSearchParams({
      page,
      details: name,
    });
    navigate(`/planet?page=${page}&details=${name}`);
  };

  const dataList = data.map(({ name, description }) => (
    <li
      className={styles.resultsItem}
      key={name}
      onClick={() => onItemClick(name)}
    >
      <p className={styles.resultName}>{name}</p>
      <p>{description}</p>
    </li>
  ));

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.resultsLeftSection}>
        <div className={styles.resultsHeading}>
          <p>Name</p>
          <p>Description</p>
        </div>
        <ul className={styles.resultsList}>{dataList}</ul>
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
