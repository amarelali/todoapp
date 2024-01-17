import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  isAllowed: boolean;
  to: string;
  children: ReactNode;
  data?: unknown;
}
const ProtectedRoute = ({ isAllowed, to, data, children }: IProps) => {
  if (!isAllowed) return <Navigate to={to} replace state={data} />;

  return children;
};
export default ProtectedRoute;
