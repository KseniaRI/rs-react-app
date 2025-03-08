import { useSearchParams } from 'react-router';
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
  const page = Number(searchParams.get('page'));
  const currentPage = Number(page) || 1;

  const { prev, next } = useAppSelector(state => state.planets);

  return (
    <div className={styles.paginationWrap}>
      <Button
        type="button"
        loading={loadingPrev}
        onClick={() => changeCurrentPage(currentPage - 1)}
        disabled={!prev || loadingPrev}
      >
        Back
      </Button>
      <span> Page {currentPage} </span>
      <Button
        type="button"
        loading={loadingNext}
        onClick={() => changeCurrentPage(currentPage + 1)}
        disabled={!next || loadingNext}
      >
        Next
      </Button>
    </div>
  );
};
export default Pagination;
