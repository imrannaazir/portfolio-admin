import { Outlet, useLocation } from "react-router-dom";
import LeftSidebar from "../navbar/left-sidebar";
import Navbar from "../navbar/navbar";
import AlertModal from "../modal/alert-modal";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { resetFilters } from "@/redux/features/filter/filterSlice";
import Modal from "../ui/modal";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch, pathname]);
  return (
    <>
      <AlertModal />
      <Modal />
      <div className="w-full">
        <Navbar />
        <div className="flex">
          <LeftSidebar />
          <div className="p-4 w-full bg-muted">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
