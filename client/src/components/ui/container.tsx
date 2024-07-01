import { cn } from "@/lib/utils";
import { FC, HTMLProps } from "react";

interface ContainerProps extends HTMLProps<HTMLDivElement> {}

const Container: FC<ContainerProps> = ({ className, children, ...rest }) => {
  return (
    <div className={cn(className, "max-w-screen-2xl mx-auto px-2")} {...rest}>
      {children}
    </div>
  );
};

export default Container;
