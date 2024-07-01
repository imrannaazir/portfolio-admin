import { selectToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(selectToken);
  if (token) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default PublicRoute;
