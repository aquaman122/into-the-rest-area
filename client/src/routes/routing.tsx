import { ROUTERS } from "@/constants/route";
import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import Main from "@/pages/Main";
import Signup from "@/pages/Signup";
import Layout from "@/layout/Layout";
import Error from "@/pages/Error";
import Footer from "@/components/Footer";

const routeList = [
  {
    path: ROUTERS.MAIN,
    element: <Main />,
  },
  {
    path: ROUTERS.AUTH.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTERS.AUTH.SIGNUP,
    element: <Signup />,
  }
];

export const router = createBrowserRouter(
  routeList.map((item) => {
    return {
      ...item,
      element: 
      <Layout>
        {item.element}
        <Footer />
      </Layout>,
      errorElement: (
        <Layout>
          <Error />
        </Layout>
      ),
    };
  })
);