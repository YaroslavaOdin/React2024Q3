import Link from "next/link";
import { useRouter } from "next/router";

type PaginationProps = {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  nav?: {
    current: number;
    total: number;
  };
  search: string;
};

const Pagination = (props: PaginationProps) => {
  const { nav = null, onNextPageClick, onPrevPageClick, search } = props;

  const router = useRouter();
  const page = router.query.page;

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
    return nav && page < nav.total ? page + 1 : page;
  };

  return (
    <div className="paginator">
      <Link
        href={`/?search=${search}&page=${getPrevPage(Number(page))}`}
        legacyBehavior
      >
        <button className="arrow" type="button" onClick={handlePrevPageClick}>
          {"<"}
        </button>
      </Link>
      {nav && (
        <span className="navigation">
          {Number(page)} / [{nav.total - 1 || 1}]
        </span>
      )}
      <Link
        href={`/?search=${search}&page=${getNextPage(Number(page))}`}
        legacyBehavior
      >
        <button className="arrow" type="button" onClick={handleNextPageClick}>
          {">"}
        </button>
      </Link>
    </div>
  );
};

export default Pagination;
