
import {
  createBrowserRouter,
  useParams,
  useNavigate,
  RouterProvider,
} from "react-router-dom";
import React from "react"
import { message } from "antd";
const Home = React.lazy(() => import('@/pages/Home/HomeView.jsx'));
const Login = React.lazy(() => import('@/pages/Login/LoginView.jsx'));
const ErrorPage = React.lazy(() => import('@/error-page.jsx'));
const Analysis = React.lazy(() => import('@/pages/Analysis/AnalysisView.jsx'));
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
            element: <PrivateRoute element={Analysis} />,
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
