import { Outlet, RouteObject, useRoutes } from "react-router-dom";
import routeStrings from "./routeStrings";
import Layout from "src/layouts";

import Task1 from "src/pages/Task1";
import Task4 from "src/pages/Task4";
import Task4Detail from "src/pages/Task4/Detail";
import Task5 from "src/pages/Task5";
import Task7 from "src/pages/Task7";

const routes: RouteObject[] = [
  {
    path: "",
    element: <Outlet />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: routeStrings.task123,
            element: <Task1 />,
          },
          {
            path: routeStrings.task4,
            element: <Task4 />,
          },
          {
            path: routeStrings.task4 + "/:id",
            element: <Task4Detail />,
          },
          {
            path: routeStrings.task5,
            element: <Task5 />,
          },
          {
            path: routeStrings.task7,
            element: <Task7 />,
          },
        ],
      },
      {
        path: "*",
        element: (
            <>page not found</>
        ),
      },
    ],
  },
];

const Routes = () => {
  const element = useRoutes(routes);
  return <>{element}</>;
};

export default Routes;
