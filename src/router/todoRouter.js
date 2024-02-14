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
