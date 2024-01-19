import React from "react";
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
        {/* 로그인 상태 체크 후 내용 출력 */}
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

      {/* 로그인 / 로그아웃버튼  */}
      <div>
        {isLogin ? (
          <Link to="/member/logout">로그아웃</Link>
        ) : (
          <Link to="/member/login">로그인</Link>
        )}
      </div>
    </nav>
  );
};

export default BasicMenu;
