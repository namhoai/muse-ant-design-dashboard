// import { useState } from "react";
import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "@assets/images/icon-logo.png";
import { dashboard, dns, users, workspaces } from "../assets/icons";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const listMenu = [
    {
      id: 'home',
      link: '/admin/home',
      label: 'Dashboard',
      icon: dashboard(color),
    },
    {
      id: 'workspaces',
      link: '/admin/workspaces',
      label: 'Workspaces',
      icon: workspaces(color),
    },
    // {
    //   id: 'users',
    //   link: '/admin/users',
    //   label: 'Users',
    //   icon: users(color),
    // },
    {
      id: 'dns',
      link: '/admin/dns',
      label: 'DNS',
      icon: dns(color),
    },
  ]

  return (
    <>
      <div className="brand">
        <img height={25} src={logo} alt="" />
        <span>FMON Dashboard</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        {
          listMenu.map((item) => (
            <Menu.Item key={item.id}>
              <NavLink to={item.link}>
                <span
                  className="icon"
                  style={{
                    background: page === item.id ? color : "",
                  }}
                >
                  {item.icon}
                </span>
                <span className="label">{item.label}</span>
              </NavLink>
            </Menu.Item>
          ))
        }
      </Menu>
    </>
  );
}

export default Sidenav;
