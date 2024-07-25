import "./Search.css";
import { useEffect, useState } from "react";
import { Character } from "../../utils/model";
import { useLocation, useNavigate } from "react-router-dom";
import DetailedCard from "../DetailedCard/DetailedCard";
import { getIdFromPath, getSearchData } from "../../utils/utils";
import Pagination from "../Pagination/Pagination";
import { LocalStorage } from "../../utils/local-storage";
import CardList from "../CardList/CardList";
import ErrorBtn from "../ErrorBtn/ErrorBtn";
import SearchInput from "../SearchInput/SearchInput";

const Search = () => {
  const [result, setResult] = useState<Character[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [openDetails, setOpenDetails] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);

  useEffect(() => {
    fetchData(0, LocalStorage().getItem());
  }, []);

  useEffect(() => {
    if (pathname.includes("star-trek-character")) {
      setOpenDetails(true);
    }
  }, [pathname]);

  useEffect(() => {
    fetchData(page, LocalStorage().getItem());
    navigate(`/search/page${page + 1}`);
  }, [page]);

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  const fetchData = async (page: number, query: string) => {
    setLoading(true);
    LocalStorage().setItem(query);

    const result = await getSearchData(query, page);

    setResult(result.characters);
    setTotalPages(result.totalPages);
    setPage(page);
    setLoading(false);
  };

  const handleNextPageClick = async () => {
    const current = page;
    const next = current + 1;
    const total = totalPages;

    setPage(next < total ? next : current);
  };

  const handlePrevPageClick = () => {
    const current = page;
    const prev = current - 1;

    setPage(prev >= 0 ? prev : current);
  };

  const closeDetails = () => {
    if (!openDetails) return;
    setOpenDetails(false);

    navigate(`/search/page${page + 1}`);
  };

  return (
    <div data-testid="main">
      <ErrorBtn />

      <div className="title">Search for Star Trek characters</div>
      <SearchInput onSearchBtnClick={fetchData} />

      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="cards-container">
          <div className="results" onClick={closeDetails}>
            {result && result?.length === 0 && (
              <div className="not-found-page"> No Results </div>
            )}

            {result && result?.length > 0 && (
              <div>
                <CardList result={result} />

                <div className="pagination">
                  <Pagination
                    onNextPageClick={handleNextPageClick}
                    onPrevPageClick={handlePrevPageClick}
                    nav={{ current: page, total: totalPages }}
                  />
                </div>
              </div>
            )}
          </div>

          {openDetails && (
            <DetailedCard
              name={getIdFromPath(pathname)}
              onClick={closeDetails}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
