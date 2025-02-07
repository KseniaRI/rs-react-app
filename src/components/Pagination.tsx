import Button from './Button';

interface PaginationProps {
  loadingNext: boolean;
  loadingPrev: boolean;
  currentPage: number;
  prevPage: string;
  nextPage: string;
  changeCurrentPage: (page: number) => void;
}
const Pagination = ({
  loadingNext,
  loadingPrev,
  currentPage,
  prevPage,
  nextPage,
  changeCurrentPage,
}: PaginationProps) => {
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
