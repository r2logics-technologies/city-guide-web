import Dashboard from "views/admin/dashboard/Dashboard.js";
import Countries from "views/admin/countries/Countries.js";
import Cities from "views/admin/cities/Cities";
import PlaceTypes from "views/admin/placetypes/Types";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-layout-11",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/countries",
    name: "Countries",
    icon: "nc-icon nc-istanbul",
    component: <Countries />,
    layout: "/admin",
  },
  {
    path: "/cities",
    name: "Cities",
    icon: "nc-icon nc-shop",
    component: <Cities />,
    layout: "/admin",
  },
  {
    path: "/placetypes",
    name: "Place Types",
    icon: "nc-icon nc-bank",
    component: <PlaceTypes />,
    layout: "/admin",
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: <UserPage />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: <TableList />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: <Typography />,
  //   layout: "/admin",
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: <UpgradeToPro />,
  //   layout: "/admin",
  // },
];
export default routes;
