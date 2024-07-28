import { createBrowserRouter, Outlet } from "react-router-dom";
import Search from "../components/Search/Search";
import DetailedCard from "../components/DetailedCard/DetailedCard";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

const ErrorBoundaryLayout = () => (
  <ErrorBoundary>
    <Outlet />
  </ErrorBoundary>
);

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        path: "/",
        element: <Search />,
        children: [
          {
            path: "star-trek-character/:uid",
            element: <DetailedCard name={""} onClick={function (): void {}} />,
          },
        ],
      },
      {
        path: "/search/:pagenumbe",
        element: <Search />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
