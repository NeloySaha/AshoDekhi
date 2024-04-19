import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ condition }) => {
  return <>{condition ? <Outlet /> : <Navigate to="/" />}</>;
};
