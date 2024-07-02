import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import sidebarGenerator from "@/utils/sidebarGenerator";
import paths from "@/routes/admin.routes";
import { ReactNode } from "react";

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const routes = sidebarGenerator(paths);
  const { pathname } = useLocation();

  let sidebarNavRoute: ReactNode;
  if (routes && routes.length) {
    sidebarNavRoute = routes?.map((item, i) => {
      // if there is children of the route
      if (item?.children && item.children.length) {
        return (
          <div key={i}>
            <Accordion className="w-[235px]" type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="  py-1 px-2">
                  <p className="flex items-center gap-2 ">
                    {item.icon}
                    {item.label}
                  </p>
                </AccordionTrigger>
                <AccordionContent className="">
                  {item.children.map((child, i) => (
                    <NavLink
                      className={cn(
                        "flex items-center font-semibold  pl-6 py-2 rounded-md",
                        pathname.includes(`${item.href}/${child?.href}`)
                          ? "bg-background"
                          : ""
                      )}
                      to={`/${item.href}/${child?.href}`}
                      key={i}
                    >
                      <Circle className="mr-2 h-2 w-2" />
                      <span>{child.label}</span>
                    </NavLink>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      }
      // if there is not children of the route
      else if (!item?.children && item?.href) {
        return (
          <NavLink
            className={cn(
              "flex items-center font-semibold gap-2  py-2 px-2  rounded-md w-[235px]",
              pathname.includes(item.href) ? "bg-background" : ""
            )}
            to={item?.href}
            key={item?.href}
          >
            {item?.icon}
            <span>{item?.label}</span>
          </NavLink>
        );
      }
    });
  }

  return (
    <nav
      className={cn(" h-full overflow-y-scroll custom-scrollbar   ", className)}
      {...props}
    >
      <div className="h-full w-full flex flex-col justify-between px-2 pt-10 pb-6">
        {/* top */}
        <div className="flex-grow ">{sidebarNavRoute}</div>
      </div>
    </nav>
  );
}
