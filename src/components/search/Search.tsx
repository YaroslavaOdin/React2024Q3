import "./Search.css";
import { useEffect, useState } from "react";
import Card from "../card-list/Card";
import { Character } from "../../utils/model";
import { useLocation, useNavigate } from "react-router-dom";
import DetailedCard from "../detailed-card/DetailedCard";
import { getIdFromPath, getSearchData } from "../../utils/utils";
import Pagination from "../pagination/Pagination";
import { LocalStorage } from "../../utils/local-storage";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>(
    LocalStorage().getItem(),
  );
  const [result, setResult] = useState<Character[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);

  useEffect(() => {
    fetchData(0);
  }, []);

  useEffect(() => {
    if (pathname.includes("star-trek-character")) {
      setOpenDetails(true);
    }
  }, [pathname]);

  useEffect(() => {
    fetchData(page);
    navigate(`/search/page${page + 1}`);
  }, [page]);

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  const fetchData = async (page: number) => {
    setLoading(true);
    LocalStorage().setItem(searchQuery);

    const result = await getSearchData(searchQuery, page);

    setResult(result.characters);
    setTotalPages(result.totalPages);
    setPage(page);
    setLoading(false);
  };

  const throwNewError = () => {
    setHasError(true);
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

  if (hasError) {
    throw new Error("Something went wrong.");
  }

  const closeDetails = () => {
    if (!openDetails) return;
    setOpenDetails(false);

    navigate(`/search/page${page + 1}`);
  };

  return (
    <div>
      <button className="error-btn" onClick={throwNewError}>
        Test error
      </button>

      <div className="title">Search for Star Trek characters</div>
      <div className="search-container">
        <div className="input">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Start search..."
          />

          <button className="btn" onClick={() => fetchData(0)}>
            Search
          </button>
        </div>
      </div>

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
                <div className="cards-list">
                  {result?.map((person) => <Card results={person}></Card>)}
                </div>

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
