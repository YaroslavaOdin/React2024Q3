import { Component, ReactNode } from "react";
import "./Main.css";
import ErrorBoundary from "../error/Error";
import Search from "../search/Search";

class Main extends Component {
  constructor(props: []) {
    super(props);
  }

  public render(): ReactNode {
    return (
      <ErrorBoundary>
        <Search></Search>
      </ErrorBoundary>
    );
  }
}

export default Main;
