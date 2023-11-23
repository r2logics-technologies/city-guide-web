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
import BlogCategories from "views/admin/blog-categories/BlogCategories";
import ListBlog from "views/admin/blog/ListBlog";
import FormBlog from "views/admin/blog/FormBlog";
import Pages from "views/admin/pages/Pages";
import Bookings from "views/admin/bookings/Bookings";
import Reviews from "views/admin/reviews/Reviews";
import Users from "views/admin/users/Users";
import Settings from "views/admin/settings/Settings";

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
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} exact />
          {/* profile  */}
          <Route path="/profile" element={<Profile />} />
          {/* Place  */}
          <Route path="/countries" element={<Countries />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/categories" element={<Categories />} />          
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/type-place" element={<PlaceTypes />} />
          <Route path="/place" element={<ListPlace />} />
          <Route path="/create-place" element={<FormPlace />} />
          <Route path="/edit-place/:id" element={<FormPlace />} />
          {/* Blogs */}
          <Route path="/categories-blog" element={<BlogCategories />} />
          <Route path="/blog" element={<ListBlog />} />
          <Route path="/create-blog" element={<FormBlog />} />
          <Route path="/edit-blog/:id" element={<FormBlog />} />
          {/* Pages */}
          <Route path="/pages" element={<Pages />} />
          {/* Bookings */}
          <Route path="/bookings" element={<Bookings />} />
          {/* Reviews */}
          <Route path="/reviews" element={<Reviews />} />
          {/* Users */}
          <Route path="/users" element={<Users />} />
          {/* Settings */}
          <Route path="/settings" element={<Settings />} />
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
