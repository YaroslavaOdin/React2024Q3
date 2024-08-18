import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import MainPage from "../components/MainPage/MainPage";
import UncontrolledForm from "../components/UncontrolledForm/UncontrolledForm";
import ReactHookForm from "../components/ReactHookFor/ReactHookForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/uncontrolled-form",
    element: <UncontrolledForm />,
  },
  {
    path: "/react-hook-form",
    element: <ReactHookForm />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
