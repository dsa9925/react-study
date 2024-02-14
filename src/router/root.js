// 라우터를 별도 파일 관리하겠다.
// 패스 가 주 경로 일때
// 패스 가 중첩일때는 또 별도로 파일 생성
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { Suspense, lazy } from "react";
import todoRouter from "./todoRouter";
import productRouter from "./productRouter";
import memberRouter from "./memberRouter";

// 메인패스 컴포넌트
const LazyMainPage = lazy(() => import("../pages/MainPage"));
const LazyAboutPage = lazy(() => import("../pages/AboutPage"));
const LazyTodoPage = lazy(() => import("../pages/todo/TodoPage"));
const LazyProductPage = lazy(() => import("../pages/products/ProductPage"));
const MemberPage = lazy(() => import("../pages/members/MemberPage"));
const LazyFormPage = lazy(() => import("../pages/forms/FormPage"));
const LazyMapPage = lazy(() => import("../pages/map/MapPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyMainPage />
      </Suspense>
    ),
  },
  {
    path: "/about",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyAboutPage />
      </Suspense>
    ),
  },
  {
    path: "/todo/",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyTodoPage />
      </Suspense>
    ),
    children: todoRouter(),
  },
  {
    path: "/product/",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyProductPage />
      </Suspense>
    ),
    children: productRouter(),
  },
  {
    path: "/member/",
    element: (
      <Suspense fallback={<Loading />}>
        <MemberPage />
      </Suspense>
    ),
    children: memberRouter(),
  },
  {
    path: "/form",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyFormPage />
      </Suspense>
    ),
  },
  {
    path: "/map",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyMapPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <h1>페이지가 없어요</h1>,
  },
]);

export default router;
