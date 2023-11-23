import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Header</h1>
      <div style={{ background: "white", textAlign: "center", fontSize: 20 }}>
        <Link to="/home">Home</Link>|<Link to="/member">Member</Link>|
        <Link to="/about">About</Link>
        <Link to="http://www.naver.com" target="_blank" rel="noreferrer">
          |네이버
        </Link>
      </div>
    </div>
  );
};

export default Header;
