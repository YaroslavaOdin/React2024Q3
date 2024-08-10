"use client";

import useLocalStorage from "../../hooks/local-storage";
import ThemeContext from "../../theme-context/themeContext";
import ErrorBtn from "../ErrorBtn/ErrorBtn";
import Flyout from "../Flyout/Flyout";
import SearchInput from "../SearchInput/SearchInput";
import ThemeBtn from "../ThemeBtn/ThemeBtn";
import { Character, IResponse } from "../../utils/model";
import { useState } from "react";
import CardList from "../CardList/CardList";
import Pagination from "../Pagination/Pagination";
import DetailedCard from "../DetailedCard/DetailedCard";
import { useRouter } from "next/navigation";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

export default function MainPage(props: {
  dataFromServer: IResponse;
  dataByIdFromServer?: IResponse;
}): JSX.Element {
  const router = useRouter();

  const result = props.dataFromServer?.characters;
  const pageData = props.dataFromServer?.page;
  const totalPage = pageData.totalPages;

  const [page, setPage] = useState(pageData?.pageNumber || 0);
  const [search, setSearch] = useLocalStorage("search-value", "");

  let dataByIdFromServer: Character;
  if (props.dataByIdFromServer) {
    dataByIdFromServer = props.dataByIdFromServer.characters[0];
  }

  const handleNextPageClick = async () => {
    const current = page;
    const next = current + 1;

    setPage(next <= totalPage ? next : current);
  };

  const handlePrevPageClick = () => {
    const current = page;
    const prev = current - 1;

    setPage(prev >= 0 ? prev : current);
  };

  const onSearchBtnClick = (search: string): void => {
    if (search) {
      setSearch(search);
      router.push(`/?search=${search}&page=0`);
    }
  };

  const closeDetails = () => {
    if (dataByIdFromServer) {
      router.push(`/?search=${search}&page=${page}`);
    }
  };

  return (
    <ErrorBoundary>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div data-testid="main" className={`theme-${theme} main-block`}>
            <ErrorBtn />
            <ThemeBtn />
            <Flyout />

            <div className="title">Search for Star Trek characters</div>
            <SearchInput onSearchBtnClick={onSearchBtnClick} />

            <div className="cards-container">
              <div className="results" onClick={closeDetails}>
                {result && result?.length === 0 && (
                  <div className="not-found-page"> No Results </div>
                )}

                {result && result?.length > 0 && (
                  <div>
                    <CardList result={result} search={search} page={page} />

                    <div className="pagination">
                      <Pagination
                        onNextPageClick={handleNextPageClick}
                        onPrevPageClick={handlePrevPageClick}
                        search={search}
                        pageData={{ page: page, totalPages: totalPage }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {dataByIdFromServer && (
                <DetailedCard
                  character={dataByIdFromServer}
                  onClick={closeDetails}
                />
              )}
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    </ErrorBoundary>
  );
}
