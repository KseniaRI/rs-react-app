import { useSearchParams } from 'react-router-dom';
import Button from '../button/Button';
import styles from './Pagination.module.css';

interface PaginationProps {
  loadingNext: boolean;
  loadingPrev: boolean;
  prevPage: string;
  nextPage: string;
  changeCurrentPage: (page: number) => void;
}
const Pagination = ({
  loadingNext,
  loadingPrev,
  prevPage,
  nextPage,
  changeCurrentPage,
}: PaginationProps) => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page'));
  return (
    <div className={styles.paginationWrap}>
      <Button
        type="button"
        loading={loadingPrev}
        onClick={() => changeCurrentPage(currentPage - 1)}
        disabled={!prevPage}
      >
        Back
      </Button>
      <span> Page {currentPage} </span>
      <Button
        type="button"
        loading={loadingNext}
        onClick={() => changeCurrentPage(currentPage + 1)}
        disabled={!nextPage}
      >
        Next
      </Button>
    </div>
  );
};
export default Pagination;
