import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "../styles/main-style.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import routes from "routes.js";

import Dashboard from "views/admin/dashboard/Dashboard.js";
import Countries from "views/admin/countries/Countries.js";
import Cities from "views/admin/cities/Cities";
import Categories from "views/admin/categories/Categories";
import PlaceTypes from "views/admin/placetypes/Types";
import Amenities from "views/admin/amenities/Amenities";
import ListPlace from "views/admin/place/ListPlace";
import FormPlace from "views/admin/place/FormPlace";
import Profile from "views/admin/profile/Profile";

var ps;

function AdminLayout(props) {
  const [backgroundColor, setBackgroundColor] = React.useState("white");
  const [activeColor, setActiveColor] = React.useState("success");
  const mainPanel = React.useRef();
  const location = useLocation();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  const handleActiveClick = (color) => {
    setActiveColor(color);
  };
  const handleBgClick = (color) => {
    setBackgroundColor(color);
  };
  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <Navbar {...props} />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} exact />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/countries" element={<Countries />} exact />
          <Route path="/cities" element={<Cities />} exact />
          <Route path="/categories" element={<Categories />} exact />
          <Route path="/placetypes" element={<PlaceTypes />} exact />
          <Route path="/amenities" element={<Amenities />} exact />
          <Route path="/place" element={<ListPlace />} exact />
          <Route path="/create-place" element={<FormPlace />} exact />
          <Route path="/edit-place/:id" element={<FormPlace />} />
        </Routes>
        <Footer fluid />
      </div>
      <FixedPlugin
        bgColor={backgroundColor}
        activeColor={activeColor}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}
      />
    </div>
  );
}

export default AdminLayout;
