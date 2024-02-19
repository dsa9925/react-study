import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { loginPost } from "../api/memberApi";
import { atomSignState } from "../atoms/atomSignState";
import { removeCookie, setCookie } from "../util/cookieUtil";

const useCustomLogin = () => {
  // 패스 이동하기
  const navigate = useNavigate();

  // Recoil 로그인 Atom 불러오기
  const [loginState, setLoginState] = useRecoilState(atomSignState);

  // Recoil 로그인 atom 리셋하기
  const resetSignState = useResetRecoilState(atomSignState);

  const isLogin = loginState.email ? true : false;

  // 로그인 기능
  const doLogin = async ({ loginParam }) => {
    const result = await loginPost({ loginParam });
    saveAsCookie(result);
    moveToPath("/");

    return result;
  };

  const saveAsCookie = result => {
    setLoginState(result);
    setCookie("member", JSON.stringify(result), 1);
  };

  // 로그아웃 기능
  const doLogout = () => {
    removeCookie("member");
    resetSignState();
  };

  // 패스이동 기능
  const moveToPath = path => {
    navigate({ pathname: path }, { replace: true });
  };

  // 로그인 페이동 기능
  const moveToLogin = () => {
    console.log("페이지 이동");
    return <Navigate replace to="/member/login" />;
  };

  return {
    loginState,
    isLogin,
    doLogin,
    doLogout,
    moveToPath,
    moveToLogin,
    saveAsCookie,
  };
};

export default useCustomLogin;
