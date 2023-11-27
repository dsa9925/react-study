import React from "react";
import { Link, NavLink } from "react-router-dom";
const Header = () => {
  const ActiveLink = {
    color: "red",
    fontWeight: "bold",
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Header</h1>
      <div style={{ background: "skyblue", textAlign: "center", fontSize: 20 }}>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "activeMenu" : "";
          }}
          to="/home"
        >
          Home
        </NavLink>
        |
        <NavLink
          className={({ isActive }) => {
            return isActive ? "activeMenu" : "";
          }}
          to="/member"
        >
          Member
        </NavLink>
        |
        <NavLink
          className={({ isActive }) => {
            return isActive ? "activeMenu" : "";
          }}
          to="/about"
        >
          About
        </NavLink>
        |
        <a href="http://www.naver.com" target="_blank">
          네이버
        </a>
      </div>
    </div>
  );
};

export default Header;
