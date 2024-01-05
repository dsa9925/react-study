import React from "react";
import { Link } from "react-router-dom";

const BasicMenu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/todo">Todo</Link>
        </li>
        <li>
          <a href="http://www.naver.com" target="_blank">
            네이버
          </a>
          {/* target 은 새로운 탭 띄워주기 */}
        </li>
      </ul>
    </nav>
  );
};

export default BasicMenu;
