import Dashboard from "views/admin/dashboard/Dashboard.js";
import Countries from "views/admin/countries/Countries.js";
import Cities from "views/admin/cities/Cities";
import Categories from "views/admin/categories/Categories";
import PlaceTypes from "views/admin/placetypes/Types";
import Amenities from "views/admin/amenities/Amenities";
import AllPlace from "views/admin/place/AllPlace";
import EditPlace from "views/admin/place/EditPlace";
import CreatePlace from "views/admin/place/CreatePlace";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-layout-11",
    component: <Dashboard />,
    layout: "/admin",
    show: true,
  },
  {
    path: "/countries",
    name: "Countries",
    icon: "nc-icon nc-istanbul",
    component: <Countries />,
    layout: "/admin",
    show: true,
  },
  {
    path: "/cities",
    name: "Cities",
    icon: "nc-icon nc-shop",
    component: <Cities />,
    layout: "/admin",
    show: true,
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "nc-icon nc-bullet-list-67",
    component: <Categories />,
    layout: "/admin",
    show: true,
  },
  {
    path: "/placetypes",
    name: "Place Types",
    icon: "nc-icon nc-bank",
    component: <PlaceTypes />,
    layout: "/admin",
    show: true,
  },
  {
    path: "/amenities",
    name: "Amenities",
    icon: "nc-icon nc-sun-fog-29",
    component: <Amenities />,
    layout: "/admin",
    show: true,
  },
  {
    path: "/all-place",
    name: "All Place",
    icon: "nc-icon nc-pin-3",
    component: <AllPlace />,
    layout: "/admin",
    show: true,
  },
  {
    path: "/create-place",
    name: "Create Place",
    component: <CreatePlace />,
    layout: "/admin",
    show: false,
  },
  {
    path: "/update-place/:id",
    name: "Update Place",
    component: <EditPlace />,
    layout: "/admin",
    show: false,
  },
];
export default routes;
