import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../pages/Layout";
import Auth from "../pages/Auth/Auth";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import NavBar from "../components/NavBar";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";

const userdata = localStorage.getItem("userdata");

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute isAllowed={userdata === null} to="/todo">
              <Auth />
            </ProtectedRoute>
          }
        />

        <Route
          path="/todo"
          element={
            <ProtectedRoute isAllowed={userdata !== null} to="/">
              <NavBar />
              <Home />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<PageNotFound/>} />
    </>
  )
);
export default router;
