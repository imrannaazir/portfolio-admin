import { TPath } from "@/types";
import { ReactNode } from "react";

type TSidebarRoute = {
  icon?: ReactNode;
  label: string;
  href: string;
  children?: TSidebarRoute[];
};
const sidebarGenerator = (paths: TPath[]) => {
  const sidebarRoutes = paths.map((item) => {
    if (item.label) {
      const sidebarRoute: TSidebarRoute = {
        href: item.path || "/",
        label: item.label,
      };
      if (item.icon) {
        sidebarRoute.icon = item.icon;
      }
      if (item.path) {
        sidebarRoute.href = item.path;
      }

      if (item.children && item.children.length) {
        const sidebarChildren: TSidebarRoute[] = [];

        item.children.forEach((child) => {
          if (child.label) {
            sidebarChildren.push({
              label: child.label,
              href: child.path || "",
            });
          }
        });

        if (sidebarChildren.length) {
          sidebarRoute.children = sidebarChildren;
        }
      }
      return sidebarRoute;
    }
  });

  return sidebarRoutes;
};

export default sidebarGenerator;
