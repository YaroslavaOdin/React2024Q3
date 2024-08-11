import Link from "next/link";

type PaginationProps = {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  search: string;
  pageData: {
    page: number;
    totalPages: number;
  };
};

const Pagination = (props: PaginationProps) => {
  const { onNextPageClick, onPrevPageClick, search, pageData } = props;

  const disablePrev = pageData.page === 0;
  const disableNext = pageData.page === pageData.totalPages - 1;

  const handleNextPageClick = () => {
    onNextPageClick();
  };
  const handlePrevPageClick = () => {
    onPrevPageClick();
  };

  const getPrevPage = (page: number): number => {
    return page === 0 ? page : page - 1;
  };

  const getNextPage = (page: number): number => {
    return page !== pageData.totalPages ? page + 1 : page;
  };

  return (
    <div className="paginator">
      <Link
        href={`/?search=${search}&page=${getPrevPage(Number(pageData.page))}`}
        legacyBehavior
      >
        <button
          className="arrow"
          type="button"
          onClick={handlePrevPageClick}
          disabled={disablePrev}
        >
          {"<"}
        </button>
      </Link>
      {pageData && (
        <span className="navigation">
          {Number(pageData.page)} / [{pageData.totalPages}]
        </span>
      )}
      <Link
        href={`/?search=${search}&page=${getNextPage(Number(pageData.page))}`}
        legacyBehavior
      >
        <button
          className="arrow"
          type="button"
          onClick={handleNextPageClick}
          disabled={disableNext}
        >
          {">"}
        </button>
      </Link>
    </div>
  );
};

export default Pagination;
