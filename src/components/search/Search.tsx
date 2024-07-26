import "./Search.css";
import { useEffect, useState } from "react";
import { Character } from "../../utils/model";
import { useLocation, useNavigate } from "react-router-dom";
import DetailedCard from "../DetailedCard/DetailedCard";
import { getIdFromPath } from "../../utils/utils";
import Pagination from "../Pagination/Pagination";
import useLocalStorage from "../../utils/local-storage";
import CardList from "../CardList/CardList";
import ErrorBtn from "../ErrorBtn/ErrorBtn";
import SearchInput from "../SearchInput/SearchInput";
import { stApi } from "../../api/starTrekApi";

const Search = () => {
  const [result, setResult] = useState<Character[]>();
  const [openDetails, setOpenDetails] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useLocalStorage("search-value", "");

  const navigate = useNavigate();

  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);

  // eslint-disable-next-line react-compiler/react-compiler
  const getCharacterByName = stApi.endpoints.getCharacterByName.useQuery;
  // eslint-disable-next-line react-compiler/react-compiler
  const getCharactersByPage = stApi.endpoints.getCharactersByPage.useQuery;

  const {
    data: dataByPage,
    isLoading: isLoadingByPage,
    isFetching: isFetchingByPage,
    // eslint-disable-next-line react-compiler/react-compiler
  } = getCharactersByPage(`${page} ${query}`);

  const {
    data: dataByName,
    isLoading: isLoadingByName,
    isFetching: isFetchingByName,
    // eslint-disable-next-line react-compiler/react-compiler
  } = getCharacterByName(query);

  useEffect(() => {
    if (pathname.includes("star-trek-character")) {
      setOpenDetails(true);
    }
  }, [pathname]);

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (dataByPage) {
      setResult(dataByPage?.characters);
      setTotalPages(dataByPage?.page?.totalPages || 0);
      setPage(page);
    }
  }, [dataByPage]);

  useEffect(() => {
    if (dataByName) {
      setResult(dataByName?.characters);
      setTotalPages(dataByName?.page?.totalPages || 0);
      setPage(0);
    }
  }, [dataByName]);

  const onSearchBtnClick = (query: string): void => {
    setQuery(query);
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
      <SearchInput onSearchBtnClick={onSearchBtnClick} />

      {isLoadingByPage ||
      isLoadingByName ||
      isFetchingByPage ||
      isFetchingByName ? (
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
