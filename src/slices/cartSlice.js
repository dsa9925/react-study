import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartItems, postChangeCart } from "../api/cartApi";

// 장바구니는 주로 외부 API 백엔드 연동
// createAsyncThunk
export const getCartItemsAsync = createAsyncThunk("getCartItemsAsync", () => {
  return getCartItems();
});
export const postChangeCartAsync = createAsyncThunk(
  "postChangeCartAsync",
  param => {
   return postChangeCart(param);
  },
);

// 초기 상태값
const initState = [];
const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initState,
  // reduces 는 state 업데이트용 서버연동 필요없이 실행함수
  reducers: {},
  // 외부 API 백엔드 서보와 연동 후 state 업데이트용 함수
  extraReducers: builder => {
    // builder.addCase(getCartItemsAsync.pending);
    // builder.addCase(getCartItemsAsync.fulfilled);
    // builder.addCase(getCartItemsAsync.rejected);
    // builder.addCase(postChangeCartAsync.pending);
    // builder.addCase(postChangeCartAsync.fulfilled);
    // builder.addCase(postChangeCartAsync.rejected);
    builder
      .addCase(getCartItemsAsync.pending, (state, action) => {
        console.log("장바구니 정보 호출 연결중입니다.");
      })
      .addCase(getCartItemsAsync.fulfilled, (state, action) => {
        console.log("장바구니 정보 호출 완료입니다.", action.payload);
        return action.payload;
      })
      .addCase(getCartItemsAsync.rejected, (state, action) => {
        console.log("장바구니 정보 호출 실패입니다.");
      })
      .addCase(postChangeCartAsync.pending, (state, action) => {
        console.log("장바구니 정보 업데이트 연결중입니다.");
      })
      .addCase(postChangeCartAsync.fulfilled, (state, action) => {
        console.log("장바구니 정보 업데이트 되었입니다.", action.payload);
        return action.payload;
      })
      .addCase(postChangeCartAsync.rejected, (state, action) => {
        console.log("장바구니 정보 업데이트가 실패하였습니다.");
      });
  },
});

export default cartSlice.reducer;
