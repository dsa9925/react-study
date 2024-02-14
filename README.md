# react-router-dom 최신 버전 활용하기

- react-router-dom 버전에 따라서 주의

- JSX 형식
  : 지금까지의 방식을 JSX 방식이라고 부르자.
  : 기존 소스 또는 프로젝트 형식

- Provider 형식
  : Provider 방식이라고 부르자.
  : 라우터를 파일 별로 관리하자.

- [react-router-dom](https://reactrouter.com/en/main/routers/picking-a-router)

## 1. 라우터를 위한 폴더 및 파일 구조

- src/router 폴더 생성합니다.
- src/router/root.js 파일 생성
- 메인패스만 정리해서 배치하고, 중첩은 별도파일로 생성

```js
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
```

## 2. children 작성하기

- src/router/productRouter.js

```js
import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../components/loading/Loading";

const LazyProductListPage = lazy(() =>
  import("../pages/products/ProductListPage"),
);
const LazyProductAddPage = lazy(() =>
  import("../pages/products/ProductAddPage"),
);
const LazyProductReadPage = lazy(() =>
  import("../pages/products/ProductReadPage"),
);
const LazyProductModifyPage = lazy(() =>
  import("../pages/products/ProductModifyPage"),
);
const productRouter = () => {
  return [
    { path: "", element: <Navigate to="list" /> },
    {
      path: "list",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyProductListPage />
        </Suspense>
      ),
    },
    {
      path: "add",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyProductAddPage />
        </Suspense>
      ),
    },
    {
      path: "read/:pno",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyProductReadPage />
        </Suspense>
      ),
    },
    {
      path: "modify/:pno",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyProductModifyPage />
        </Suspense>
      ),
    },
  ];
};
export default productRouter;
```

- src/router/todoRouter.js

```js
import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
const LazyTodoListPage = lazy(() => import("../pages/todo/ListPage"));
const LazyTodoReadPage = lazy(() => import("../pages/todo/ReadPage"));
const LazyTodoModifyPage = lazy(() => import("../pages/todo/ModifyPage"));
const LazyTodoAddPage = lazy(() => import("../pages/todo/AddPage"));

const todoRouter = () => {
  return [
    { path: "", element: <Navigate to="list" /> },
    {
      path: "list",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyTodoListPage />
        </Suspense>
      ),
    },
    {
      path: "add",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyTodoAddPage />
        </Suspense>
      ),
    },
    {
      path: "modify/:tno",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyTodoModifyPage />
        </Suspense>
      ),
    },
    {
      path: "read/:tno",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyTodoReadPage />
        </Suspense>
      ),
    },
  ];
};
export default todoRouter;
```

- src/router/memmberRouter.js ...

```js
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
```
