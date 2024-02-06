import { Outlet } from "react-router-dom";

interface IProps {}
const Layout = ({}: IProps) => {
  return (
    <>
      <Outlet />
    </>
  );
};
export default Layout;
