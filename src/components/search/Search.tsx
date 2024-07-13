import "./Search.css";
import { useEffect, useState } from "react";
import Card from "../card-list/Card";
import { Character } from "../../utils/model";
import { useLocation, useNavigate } from "react-router-dom";
import DetailedCard from "../detailed-card/DetailedCard";
import { getIdFromPath } from "../../utils/utils";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [result, setResult] = useState<Character[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [openDetails, setOpenDetails] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);

  const setToLocaleStorage = (search: string) => {
    localStorage.setItem("searchQuery", search);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (getIdFromPath(pathname) !== "/") {
      setOpenDetails(true);
    }
  }, [pathname]);

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  const fetchData = async () => {
    setLoading(true);
    setToLocaleStorage(searchQuery);

    const url = "https://stapi.co/api/v1/rest/character/search";

    if (searchQuery) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accept: "application/json",
        },
        body: `name=${searchQuery}`,
      };

      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setResult(result.characters);
          setLoading(false);
        });
    } else {
      await fetch(`${url}?pageNumber=0`)
        .then((response) => response.json())
        .then((result) => {
          setResult(result.characters);
          setLoading(false);
        });
    }
  };

  const throwNewError = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error("Something went wrong.");
  }

  const closeDetails = () => {
    if (!openDetails) return;
    setOpenDetails(false);

    navigate("/");
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

          <button className="btn" onClick={() => fetchData()}>
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="cards-container">
          <div className="results" onClick={closeDetails}>
            <div className="cards-list">
              {result?.map((person) => <Card results={person}></Card>)}
            </div>
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
