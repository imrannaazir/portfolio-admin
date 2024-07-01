import { TPath } from "@/types";
import { RouteObject } from "react-router-dom";

const routeGenerator = (paths: TPath[]) => {
  const routes = paths.map((item) => {
    if (item.path) {
      const browserRoute: RouteObject = { path: item.path };
      if (item.element) {
        browserRoute.element = item.element;
      }
      if (item.children && item.children.length) {
        browserRoute.children = item.children.map((child) => {
          if (child.path) {
            return {
              path: child.path,
              element: child.element,
            };
          } else {
            return {
              index: child.index,
              element: child.element,
            };
          }
        });
      }
      return browserRoute;
    } else {
      return {
        index: item.index,
        element: item.element,
      };
    }
  });

  return routes;
};

export default routeGenerator;
