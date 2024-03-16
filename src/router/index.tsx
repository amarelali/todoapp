import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Auth from "../pages/Auth/Auth";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import NavBar from "../components/NavBar";
import MyToDos from "../pages/MyToDos";

const userdata = localStorage.getItem("userdata");

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/">
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
      <Route
          path="/mytodos"
          element={
            <ProtectedRoute isAllowed={userdata !== null} to="/">
              <NavBar />
              <MyToDos />
            </ProtectedRoute>
          }
        />
      <Route path="*" element={<PageNotFound/>} />
    </>
  )
);
export default router;
