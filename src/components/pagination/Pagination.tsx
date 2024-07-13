import "./Pagination.css";

type PaginationProps = {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  nav?: {
    current: number;
    total: number;
  };
};

const Pagination = (props: PaginationProps) => {
  const { nav = null, onNextPageClick, onPrevPageClick } = props;

  const handleNextPageClick = () => {
    onNextPageClick();
  };
  const handlePrevPageClick = () => {
    onPrevPageClick();
  };

  return (
    <div className="paginator">
      <button className="arrow" type="button" onClick={handlePrevPageClick}>
        {"<"}
      </button>
      {nav && (
        <span className="navigation">
          {nav.current + 1} / {nav.total}
        </span>
      )}
      <button className="arrow" type="button" onClick={handleNextPageClick}>
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
