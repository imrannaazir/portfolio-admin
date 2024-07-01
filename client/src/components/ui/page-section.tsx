import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { FC, ReactNode } from "react";
import { Label } from "./label";

type TPageSectionProps = {
  children: ReactNode;
  className?: ClassValue;
  title?: string;
};
const PageSection: FC<TPageSectionProps> = ({ children, className, title }) => {
  return (
    <section
      className={cn("bg-background p-6 rounded-lg border shadow-sm", className)}
    >
      {title && <Label>{title}</Label>}
      {children}
    </section>
  );
};

export default PageSection;
