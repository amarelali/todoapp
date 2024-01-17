import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

interface IProps {}
const Layout = ({}: IProps) => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
export default Layout;
