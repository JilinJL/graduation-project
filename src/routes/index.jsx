import Login from '@/pages/Login/LoginView.jsx';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  import Home from "@/pages/Home/HomeView.jsx"
  import ErrorPage from '@/error-page.jsx';

  
const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
      children: [
        { 
          errorElement: <ErrorPage/>,
          children:[
            {
              path: "/contact",
              element: <div style={{width: '94%',height:'100%',border: '1px solid black',marginLeft: '20px'}}>内容框</div>
            }

          ]
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);

  export default router;