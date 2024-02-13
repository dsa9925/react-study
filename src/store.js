import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import cartSlice from "./slices/cartSlice";
// store 가 공용 데이터 보관장소, state 입니다.
export default configureStore({
  reducer: {
    // 슬라이스 등록
    loginSlice: loginSlice,
    cartSlice: cartSlice,
  },
});
