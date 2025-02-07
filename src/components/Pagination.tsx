import { useSearchParams } from 'react-router-dom';
import Button from './Button';

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
    <div>
      <Button
        type="button"
        loading={loadingPrev}
        onClick={() => changeCurrentPage(currentPage - 1)}
        disabled={!prevPage}
      >
        Back
      </Button>
      <span> page {currentPage} </span>
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
