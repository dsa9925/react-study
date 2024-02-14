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
