import { useState } from "react";
import { LocalStorage } from "../../utils/local-storage";

type SearchInputProps = {
  onSearchBtnClick: (page: number, query: string) => void;
};

const SearchInput = (props: SearchInputProps) => {
  const { onSearchBtnClick } = props;
  const [searchQuery, setSearchQuery] = useState<string>(
    LocalStorage().getItem(),
  );

  const fetchData = (page: number, query: string) => {
    onSearchBtnClick(page, query);
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

        <button className="btn" onClick={() => fetchData(0, searchQuery)}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
