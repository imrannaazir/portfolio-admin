import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import MainNav from "./main-nav";

export function SheetNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <AlignJustify />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[200px]" side={"left"}>
        <MainNav />
      </SheetContent>
    </Sheet>
  );
}
