import useLocalStorage from "../../hooks/local-storage";
import ThemeContext from "../../theme-context/themeContext";
import ErrorBtn from "../ErrorBtn/ErrorBtn";
import Flyout from "../Flyout/Flyout";
import SearchInput from "../SearchInput/SearchInput";
import ThemeBtn from "../ThemeBtn/ThemeBtn";
import { IResponse } from "../../utils/model";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import globalStyles from "../../styles/global";
import CardList from "../CardList/CardList";
import Pagination from "../Pagination/Pagination";
import DetailedCard from "../DetailedCard/DetailedCard";

export default function MainPage(dataFromServer: IResponse): JSX.Element {
  const [inputValue, setinputValue] = useLocalStorage("search-value", "");
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const router = useRouter();
  const currentUrl = router.asPath;

  useEffect(() => {
    if (currentUrl === "/") {
      router.push(`/?search=${inputValue}&page=${Number(p.pageNumber)}`);
    }
  }, []);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  const result = dataFromServer.dataFromServer.characters;
  const p = dataFromServer.dataFromServer.page;

  const handleNextPageClick = async () => {
    const current = page;
    const next = current + 1;
    const total = p.totalPages;

    setPage(next < total ? next : current);
  };

  const handlePrevPageClick = () => {
    const current = page;
    const prev = current - 1;

    setPage(prev >= 0 ? prev : current);
  };

  const onSearchBtnClick = (inputValue: string): void => {
    if (inputValue) {
      setinputValue(inputValue);
      router.replace(`/?search=${inputValue}&page=0`);
    }
  };

  const closeDetails = () => {
    if(searchCharacter) {
      router.replace(`/?search=${inputValue}&page=${page}`);
    }
  };

  const searchCharacter = dataFromServer?.dataByIdFromServer?.characters[0];

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div data-testid="main" className={`theme-${theme} main-block`}>
          <ErrorBtn />
          <ThemeBtn />
          <Flyout />

          <div className="title">Search for Star Trek characters</div>
          <SearchInput onSearchBtnClick={onSearchBtnClick} />

          {isLoading ? (
            <div className="loader">Loading...</div>
          ) : (
            <div className="cards-container">
              <div className="results" onClick={closeDetails}>
                {result && result?.length === 0 && (
                  <div className="not-found-page"> No Results </div>
                )}

                {result && result?.length > 0 && (
                  <div>
                    <CardList result={result} search={inputValue} />

                    <div className="pagination">
                      <Pagination
                        onNextPageClick={handleNextPageClick}
                        onPrevPageClick={handlePrevPageClick}
                        nav={{ current: page, total: p.totalPages }}
                        search={inputValue}
                      />
                    </div>
                  </div>
                )}
              </div>

              {searchCharacter && (
                <DetailedCard
                  character={searchCharacter}
                  onClick={closeDetails}
                />
              )}
            </div>
          )}

          <style jsx global>
            {globalStyles}
          </style>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}
