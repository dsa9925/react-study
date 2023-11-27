import React from "react";
import { Link, Outlet } from "react-router-dom";

const About = ({ title }) => {
  return (
    <div>
      <h2>About : {title}</h2>
      <div>
        <Link to="/about/ceo">Ceo 인사말</Link>
        <br />
        <Link to="/about/map">회사위치</Link>
        <br />
        <Link to="/about/notice?page=1&user=hong&total=9">공지사항</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default About;
