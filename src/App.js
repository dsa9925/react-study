import React, { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Loading from "./components/loading/Loading";
// lasy 는 실시간으로 컴포넌트 불러들이기
const LazyMainPage = lazy(() => import("./pages/MainPage"));
const LazyAboutPage = lazy(() => import("./pages/AboutPage"));
const LazyTodoPage = lazy(() => import("./pages/todo/TodoPage"));
const LazyTodoListPage = lazy(() => import("./pages/todo/ListPage"));
const LazyTodoReadPage = lazy(() => import("./pages/todo/ReadPage"));
const LazyTodoModifyPage = lazy(() => import("./pages/todo/ModifyPage"));
const LazyTodoAddPage = lazy(() => import("./pages/todo/AddPage"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <LazyMainPage />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<Loading />}>
              <LazyAboutPage />
            </Suspense>
          }
        />
        <Route
          path="/todo/"
          element={
            <Suspense fallback={<Loading />}>
              <LazyTodoPage />
            </Suspense>
          }
        >
          {/* 최초 페이지 */}
          <Route index element={<Navigate to="list" />}></Route>
          {/* <Route path="" element={<Navigate to="list" />}></Route> */}

          <Route
            path="list"
            element={
              <Suspense fallback={<Loading />}>
                <LazyTodoListPage />
              </Suspense>
            }
          ></Route>
          <Route
            path="add"
            element={
              <Suspense fallback={<Loading />}>
                <LazyTodoAddPage />
              </Suspense>
            }
          ></Route>
          <Route
            path="modify/:tno"
            element={
              <Suspense fallback={<Loading />}>
                <LazyTodoModifyPage />
              </Suspense>
            }
          ></Route>
          <Route
            path="read/:tno"
            element={
              <Suspense fallback={<Loading />}>
                <LazyTodoReadPage />
              </Suspense>
            }
          ></Route>
        </Route>

        <Route path="*" element={<h1>페이지가 없어요</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
