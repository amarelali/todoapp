import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../pages/Layout";
import Auth from "../pages/Auth";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Auth />} />
        <Route path="h2" element={<h2>h2 test</h2>}/>
      </Route>
      <Route path="*" element={<h2>Page Not Found !</h2>} />
    </>
  )
);
export default router;
