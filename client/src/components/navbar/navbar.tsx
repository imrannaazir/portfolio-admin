import { useAppDispatch } from "@/redux/hooks";
import { Button } from "../ui/button";
import { logOut } from "@/redux/features/auth/authSlice";
import { SheetNav } from "./SheetNav";
import { useLogoutMutation } from "@/redux/features/auth/authApi";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const onLogout = async () => {
    await logout(undefined);
    dispatch(logOut());
  };
  return (
    <div
      className=" 
  sticky
  top-0
  z-50
  "
    >
      <div className="  backdrop-blur-md">
        <div
          className=" 
          bg-foreground 
          flex
          min-h-16
          items-center
          px-4
    
    "
        >
          {/* logo */}
          <div className="lg:hidden">
            <SheetNav />
          </div>
          {/* <MainNav className="mx-4" /> */}
          <div
            className="
          ml-auto
          flex
          items-center
          space-x-4"
          >
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
