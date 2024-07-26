import { useState } from "react";
import useLocalStorage from "../../utils/local-storage";

type SearchInputProps = {
  onSearchBtnClick: (query: string) => void;
};

const SearchInput = (props: SearchInputProps) => {
  const { onSearchBtnClick } = props;
  const [query] = useLocalStorage("search-value", "");
  const [searchQuery, setSearchQuery] = useState<string>(query);

  const fetchData = (query: string) => {
    onSearchBtnClick(query);
  };

  return (
    <div className="search-container">
      <div className="input">
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Start search..."
        />

        <button className="btn" onClick={() => fetchData(searchQuery)}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
