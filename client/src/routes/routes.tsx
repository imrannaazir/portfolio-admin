import App from "@/App";
import PublicRoute from "@/components/layout/PublicRoutes";
import LoginPage from "@/pages/Login";
import ProductTable from "@/pages/Playground";
import routeGenerator from "@/utils/routeGenerator";
import { createBrowserRouter } from "react-router-dom";
import paths from "./admin.routes";

const router = createBrowserRouter([
  {
    path: "/playground",
    element: <ProductTable />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        {" "}
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: <App />,
    children: routeGenerator(paths),
  },
]);

export default router;
