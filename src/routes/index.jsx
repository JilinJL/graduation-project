
import {
  createBrowserRouter,
  useParams,
  useNavigate,
  RouterProvider,
} from "react-router-dom";
import React from "react"
import { message } from "antd";
import Home from "@/pages/Home/HomeView"
import Login from "@/pages/Login/LoginView"
import ErrorPage from "@/error-page.jsx"
import AnalysisView from "../pages/Analysis/AnalysisView";

import PrivateRoute from "./PrivateRoute";



const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute element={Home} />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "analysis/:analysisId",
            element: <PrivateRoute element={AnalysisView} />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <PrivateRoute mark='login' element={Login} />
  }
]);

export default router;
