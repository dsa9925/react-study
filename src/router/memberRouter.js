import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
const LoginPage = lazy(() => import("../pages/members/LoginPage"));
const LogoutPage = lazy(() => import("../pages/members/LogoutPage"));
const LazyKaKaoPage = lazy(() => import("../pages/members/KakaoRedirectPage"));
const LazyModifyPage = lazy(() => import("../pages/members/ModifyPage"));

const memberRouter = () => {
  return [
    { path: "", element: <Navigate to="login" /> },
    {
      path: "login",
      element: (
        <Suspense fallback={<Loading />}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: "logout",
      element: (
        <Suspense fallback={<Loading />}>
          <LogoutPage />
        </Suspense>
      ),
    },
    {
      path: "kakao",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyKaKaoPage />
        </Suspense>
      ),
    },
    {
      path: "modify",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyModifyPage />
        </Suspense>
      ),
    },
  ];
};
export default memberRouter;
