import { Search } from "lucide-react";
import { ReactNode } from "react";

const SearchInput = ({ children }: { children: ReactNode }) => {
  return (
    <div className="  flex-grow">
      <form>
        <div className="relative">
          {children}
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
