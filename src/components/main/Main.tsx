import "./Main.css";
import ErrorBoundary from "../error/Error";
import Search from "../search/Search";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailedCard from "../detailed-card/DetailedCard";

const Main = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search />}>
            <Route
              path="star-trek-character/:uid"
              element={
                <DetailedCard name={""} onClick={function (): void {}} />
              }
            />
          </Route>
          <Route
            path="*"
            element={<div className="not-found-page"> 404 Not Found </div>}
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default Main;
