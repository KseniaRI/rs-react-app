import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import Button from '../button/Button';
import styles from './Pagination.module.css';

interface PaginationProps {
  loadingNext: boolean;
  loadingPrev: boolean;
  changeCurrentPage: (page: number) => void;
}
const Pagination = ({
  loadingNext,
  loadingPrev,
  changeCurrentPage,
}: PaginationProps) => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page'));

  const { prev, next } = useAppSelector(state => state.planets);

  return (
    <div className={styles.paginationWrap}>
      <Button
        type="button"
        loading={loadingPrev}
        onClick={() => changeCurrentPage(currentPage - 1)}
        disabled={!prev}
      >
        Back
      </Button>
      <span> Page {currentPage} </span>
      <Button
        type="button"
        loading={loadingNext}
        onClick={() => changeCurrentPage(currentPage + 1)}
        disabled={!next}
      >
        Next
      </Button>
    </div>
  );
};
export default Pagination;
