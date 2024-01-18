import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useCustomLogin = () => {
  // 패스 이동하기
  const navigate = useNavigate();
  // RTK 상태값 업데이트
  const dispatch = useDispatch();
  // RTK 상태값 읽기
  const loginState = useSelector(state => state.loginState);
  // 로그인 상태값 파악
  const isLogin = loginState.email ? true : false;
  // 로그인 기능
  const doLogin = () => {};
  // 로그아웃 기능
  const doLogout = () => {};
  // 패스이동 기능
  const moveToPath = () => {};
  // 로그인 페이지로 이동 기능
  const moveToLogin = () => {};

  return { loginState, isLogin, doLogin, doLogout, moveToLogin, moveToPath };
};

export default useCustomLogin;
