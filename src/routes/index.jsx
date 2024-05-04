
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
import ContentView  from "../pages/Content/ContentView";
import PrivateRoute from "./PrivateRoute";
import WordsCloudView from "../pages/WordsCloud/WordsCloudView";


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
          {
            path: "newContent",
            element: <PrivateRoute element={ContentView} />,
          },
          {
            path: "wordsCloud",
            element: <PrivateRoute element={WordsCloudView} />,
          }
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
