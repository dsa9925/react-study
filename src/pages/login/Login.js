import React from "react";
import { userLoginedId } from "../../config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const postTodo = () => {
    const obj = {
      title: title,
      content: content,
      userId: userLoginedId,
    };
  };
  // 로그인해서 값 받는 경우
  const realLogin = () => {
    userLoginedId = "받아온 값";
  };
  // 로그인해서 값 고정
  const fakeLogin = () => {
    // 아무것도 하지 마세요.
    navigate("/페이지");
  };
  return (
    <div>
      <h1>Login</h1>
      <div>
        <button
          onClick={() => {
            realLogin();
          }}
        >
          로그인하고 아이디값을 받는 경우
        </button>
        <button
          onClick={() => {
            fakeLogin();
          }}
        >
          그냥 로그인 아이디값 고정
        </button>
      </div>
    </div>
  );
};

export default Login;
