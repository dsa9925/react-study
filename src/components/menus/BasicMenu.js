import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
const BasicMenu = () => {
  // 로그인 슬라이스에서 email 읽는다.
  // loginSlice 값을 읽으려고 접근하기
  // const loginState = useSelector(state => state.loginSlice);
  // console.log(loginState);
  const { isLogin } = useCustomLogin();

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
          <Link to="/form">Form</Link>
        </li>
        <li>
          <Link to="/map">카카오지도</Link>
        </li>
        {/* 로그인 상태 체크 후 내용출력 */}
        {isLogin ? (
          <>
            <li>
              <Link to="/todo/">Todo</Link>
            </li>
            <li>
              <Link to="/product/">Product</Link>
            </li>
          </>
        ) : null}
      </ul>
      <ul>
        {isLogin ? (
          <li>
            <Link to="/member/logout">로그아웃</Link>
          </li>
        ) : (
          <li>
            <Link to="/member/login">로그인</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default BasicMenu;
