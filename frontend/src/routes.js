import * as BiIcons from "react-icons/bi";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <BiIcons.BiSolidDashboard className="side-bar-icon" />,
  },
  {
    name: "Place",
    icon: <BiIcons.BiLocationPlus className="side-bar-icon" />,
    subMenu: [
      {
        path: "/countries",
        name: "Countries",
        icon: <BiIcons.BiGlobeAlt className="side-bar-icon" />,
      },
      {
        path: "/cities",
        name: "Cities",
        icon: <BiIcons.BiSolidCity className="side-bar-icon" />,
      },
      {
        path: "/categories",
        name: "Categories",
        icon: <BiIcons.BiCategoryAlt className="side-bar-icon" />,
      },
      {
        path: "/placetypes",
        name: "Place Types",
        icon: <BiIcons.BiPurchaseTag className="side-bar-icon" />,
      },
      {
        path: "/amenities",
        name: "Amenities",
        icon: <BiIcons.BiWifi className="side-bar-icon" />,
      },
      {
        path: "/place",
        name: "All Place",
        icon: <BiIcons.BiLocationPlus className="side-bar-icon" />,
      },
    ],
  },
  {
    name: "Blog",
    icon: <BiIcons.BiFoodMenu className="side-bar-icon" />,
    subMenu: [
      {
        path: "/all-posts",
        name: "All Posts",
        icon: <BiIcons.BiLayout  className="side-bar-icon" />,
      },
      {
        path: "/blog-categories",
        name: "Categories",
        icon: <BiIcons.BiGridAlt className="side-bar-icon" />,
      },
    ],
  },
  {
    path: "/pages",
    name: "Pages",
    icon: <BiIcons.BiLayer className="side-bar-icon" />,
  },
  {
    path: "/bookings",
    name: "Bookings",
    icon: <BiIcons.BiCalendarCheck  className="side-bar-icon" />,
  },
  {
    path: "/reviews",
    name: "Reviews",
    icon: <BiIcons.BiSolidStarHalf  className="side-bar-icon" />,
  },
  {
    path: "/users",
    name: "Users",
    icon: <BiIcons.BiSolidUserDetail className="side-bar-icon" />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiIcons.BiCog className="side-bar-icon" />,
  },
];
export default routes;
