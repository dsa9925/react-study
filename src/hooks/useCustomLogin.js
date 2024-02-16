import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { loginPostAsync, logout } from "../slices/loginSlice";
import { useRecoilState, useResetRecoilState } from "recoil";
import { atomSignState } from "../atoms/atomSignState";
import { loginPost } from "../api/memberApi";
import { removeCookie, setCookie } from "../util/cookieUtil";
const useCustomLogin = () => {
  // 패스 이동하기
  const navigate = useNavigate();
  // Recoil 로그인 Atom 불러오기
  const [loginState, setLoginState] = useRecoilState(atomSignState);
  // Recoil 로그인 atom 리셋하기
  const resetSignState = useResetRecoilState(atomSignState);
  // RTK 상태값 업데이트
  // const dispatch = useDispatch();
  // RTK 상태값 읽기
  // const loginState = useSelector(state => state.loginSlice);
  // 로그인 상태값 파악
  const isLogin = loginState.email ? true : false;
  // 로그인 기능
  const doLogin = async ({ loginParam }) => {
    // 로그인 어느화면에서 실행이 될 소지가 높아요.
    // 로그인 상태 업데이트
    // RTK
    // const action = dispatch(
    //   loginPostAsync({ loginParam, successFn, failFn, errorFn }),
    // );
    // Recoil
    const result = await loginPost({ loginParam });
    // 로그인 하고 나서 쿠키저장
    // 로그인 atom 업데이트
    saveAsCookie(result);
    moveToPath("/");
    // 결과값
    return result;
  };
  const saveAsCookie = result => {
    setLoginState(result);
    setCookie("member", JSON.stringify(result), 1);
  };
  // 로그아웃 기능
  const doLogout = () => {
    // RTK
    // dispatch(logout());
    // 쿠키지우기
    removeCookie("member");
    // Recoil 리셋
    resetSignState();
  };
  // 패스이동 기능
  const moveToPath = path => {
    // 패스로 이동 후에 replace:ture 를 적용시 뒤로 가기 화면
    // 이전 페이지 기록을 남기지 않는다.
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
