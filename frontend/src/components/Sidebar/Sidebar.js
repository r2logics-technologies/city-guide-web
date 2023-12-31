import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "../../assets/img/apple-icon.png";
import { ProSidebarProvider, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

var ps;

function Sidebar(props) {
  const location = useLocation();
  const sidebar = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  const renderMenuItems = (items) => {
    return items.map((item, key) => {
      if (item.subMenu) {
        return (
          <SubMenu
            key={key}
            title={item.name}
            className={activeRoute(props.path)}
            icon={item.icon}
          >
            {renderMenuItems(item.subMenu)}
          </SubMenu>
        );
      } else {
        return (
          <MenuItem
            className={activeRoute(item.path)}
            component={<Link to={"/admin" + item.path} className="link" />}
            key={key}
            icon={item.icon}
          >
            {item.name}
          </MenuItem>
        );
      }
    });
  };

  return (
    <div
      className="sidebar text-corel"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo d-flex align-items-center justify-content-start">
        <Link to="/admin/dashboard" className="simple-text logo-mini" >
          <div className="logo-img">
            <img src={logo} style={{width:'1.3rem'}} alt="react-logo" />
          </div>
        </Link>
        <Link to="/admin/dashboard" className="simple-text text-inherit logo-normal">
          City Guide Admin
        </Link>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <ProSidebarProvider >
          <Menu transitionDuration={1000} >
            {props.routes.map((item, key) => {
              return item.subMenu ? (
                <SubMenu key={key} label={item.name} icon={item.icon}>
                  {renderMenuItems(item.subMenu)}
                </SubMenu>
              ) : (
                <MenuItem
                  className={activeRoute(item.path)}
                  component={
                    <Link to={"/admin" + item.path} className="link" />
                  }
                  key={key}
                  icon={item.icon}
                >
                  {item.name}
                </MenuItem>
              );
            })}
          </Menu>
        </ProSidebarProvider>
      </div>
    </div>
  );
}

export default Sidebar;
