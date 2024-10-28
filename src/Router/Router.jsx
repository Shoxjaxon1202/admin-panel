import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Dashboard from "../Pages/Dashboard";
import Settings from "../Pages/Settings";
import Brands from "../Pages/Brands";
import Models from "../Pages/Models";
import Cities from "../Pages/Cities";
import Cars from "../Pages/Cars";
import Locations from "../Pages/Locations";
import NotFound from "../Pages/NotFound";

const AppRouter = () => {
  return (
    <Routes>
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/categories" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/brands" element={<Brands />} />
      <Route path="/models" element={<Models />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/cities" element={<Cities />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
