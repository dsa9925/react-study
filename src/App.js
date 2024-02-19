import { RouterProvider } from "react-router-dom";
import router from "./router/root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// ReactQuey 셋팅
// 왜 App.js 에서 셋팅을 할까? (웹서비스 전체에 상태관리)
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* 리액트쿼리 개발자도구 */}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

export default App;
