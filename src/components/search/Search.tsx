import { Component, ReactNode } from "react";
import "./Search.css";

interface DefaultState {
  searchQuery: string;
  result: [];
  loading: boolean;
  hasError: boolean;
}

interface Character {
  uid: number;
  name: string;
  gender: string;
  yearOfBirth: number;
  yearOfDeath: number;
}

interface Result {
  characters: [];
}

class Search extends Component {
  constructor(props: []) {
    super(props);

    this.state = {
      searchQuery: localStorage.searchQuery ? localStorage.searchQuery : "",
      result: [],
      loading: true,
    };

    this.fetchData = this.fetchData.bind(this);
    this.throwNewError = this.throwNewError.bind(this);
  }

  public async componentDidMount(): Promise<void> {
    const { searchQuery } = this.state as DefaultState;
    await this.fetchData(searchQuery);
  }

  private setToLocaleStorage(search: string): void {
    localStorage.setItem("searchQuery", search);
  }

  private async fetchData(searchQuery: string): Promise<void> {
    this.setState({ loading: true });
    this.setToLocaleStorage(searchQuery);

    if (searchQuery) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accept: "application/json",
        },
        body: `name=${searchQuery}`,
      };

      await fetch(
        "https://stapi.co/api/v1/rest/character/search",
        requestOptions,
      )
        .then((response) => response.json())
        .then((result) => this.setState({ result: result, loading: false }));
    } else {
      await fetch("https://stapi.co/api/v1/rest/character/search?pageNumber=0")
        .then((response) => response.json())
        .then((result) => this.setState({ result: result, loading: false }));
    }
  }

  private throwNewError(): void {
    this.setState({ hasError: true });
  }

  public render(): ReactNode {
    const { searchQuery, result, loading, hasError } = this
      .state as DefaultState;

    if (hasError) {
      throw new Error("Something went wrong.");
    }

    const listItems = (result as unknown as Result)?.characters?.map(
      (person: Character) => (
        <div key={person.uid} className="card">
          <b className="card_info">{person.name}</b>
          <span className="card_info">Gender : {person.gender}</span>
          <span className="card_info">
            Year of birth : {person.yearOfBirth}
          </span>
          <span className="card_info">
            Year of death : {person.yearOfDeath}
          </span>
        </div>
      ),
    );

    return (
      <div>
        <button
          className="error-btn"
          onClick={() => {
            this.throwNewError();
          }}
        >
          Test error
        </button>

        <div className="title">Search for Star Trek characters</div>
        <div className="search-container">
          <div className="input">
            <input
              type="text"
              value={searchQuery}
              onChange={(event) =>
                this.setState({ searchQuery: event.target.value })
              }
              placeholder="Start search..."
            />

            <button className="btn" onClick={() => this.fetchData(searchQuery)}>
              Search
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <div className="cards-container">{listItems}</div>
        )}
      </div>
    );
  }
}

export default Search;
