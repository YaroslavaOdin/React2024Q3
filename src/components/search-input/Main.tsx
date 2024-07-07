import { Component, ReactNode } from "react";
import "./Main.css";

interface DefaultState {
  searchQuery: string;
  result: [];
  loading: boolean;
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

class Main extends Component {
  constructor(props: []) {
    super(props);

    this.state = {
      searchQuery: localStorage.searchQuery ? localStorage.searchQuery : "",
      result: [],
      loading: true,
    };

    this.fetchData = this.fetchData.bind(this);
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
        "https://stapi.co/api/v1/rest/character/search?pageNumber=1",
        requestOptions,
      )
        .then((response) => response.json())
        .then((result) => this.setState({ result: result, loading: false }));
    } else {
      await fetch("https://stapi.co/api/v1/rest/character/search?pageNumber=1")
        .then((response) => response.json())
        .then((result) => this.setState({ result: result, loading: false }));
    }
  }

  public render(): ReactNode {
    const { searchQuery, result, loading } = this.state as DefaultState;
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

export default Main;
