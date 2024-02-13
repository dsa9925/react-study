# 장바구니 (RTK 활용 연습)

- RTK (Redux-toolkit) 복습
  : 1. store 생성(/src/store.js)
  : 참고 ( 보충 : Redux 를 활용 경우 /src/store 폴더 생성후 진행)
  : 2. index.js 또는 App.js 선택해서 store 셋팅
  : 3. /src/slices 폴더 /src/reducers 폴더 생성
  : slice 파일 들 배치 (loginSlice.js)
  : 4. /src/store.js 에 reducer에 slice 내용 배치

## 1. cartApi 를 생성

- /src/api/cartApi.js

```js
import jwtAxios from "../util/jwtUtill.js";
import { API_SERVER_HOST } from "./todoApi.js";

const host = `${API_SERVER_HOST}/api/cart`;

export const getCartItems = async () => {
  // 파라메터는 JWT 인증으로 해결할 것이다.
  const res = await jwtAxios.get(`${host}/items`);
  return res.data;
};

// 포스트 기능
// 제품 수량등 변경
export const postChangeCart = async cartItem => {
  // 실제로 개발에 필요한 것과 예제로 그냥 진행하는 것과는 차이가 있다.
  const res = await jwtAxios.post(`${host}/change`, cartItem);
  return res.data;
};
```

## 2. cart전용 slice 파일 생성

- /src/slices/cartSlice.js

```js
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
    postChangeCart(param);
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
```

## 3. stroe 에 cartSlice 등록하기

- /src/store.js

```js
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
```

## 4. 장바구니 화면 컴포넌트 배치하기

- /src/components/cart 폴더/CartComponent.js

```js
import React from "react";

const CartComponent = () => {
  return <div>CartComponent</div>;
};

export default CartComponent;
```

- /src/layout/BasicLayout.js

```js
import React from "react";
import BasicMenu from "../components/menus/BasicMenu";
import CartComponent from "../components/cart/CartComponent";

// 객체 구조 분해 할당
const BasicLayout = ({ children }) => {
  return (
    <div className="wrap">
      <header>
        <BasicMenu />
      </header>

      <div>
        <main>{children}</main>
        <CartComponent />
      </div>

      <footer>하단</footer>
    </div>
  );
};

export default BasicLayout;
```

## 4. 장바구니 화면 컴포넌트 기능 작성

- /src/components/cart 폴더/CartComponent.js

```js
import React, { useEffect } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsAsync } from "../../slices/cartSlice";

const CartComponent = () => {
  // 로그인 정보를 이용
  const { isLogin, loginState } = useCustomLogin();
  // 장바구니 정보 가져오기
  // RTK 의 cartSlice 의 state 정보 읽기
  const cartItem = useSelector(state => state.cartSlice);

  // API 백엔드 서버 호출 후 cartSlice 상태값 업데이트
  const dispatch = useDispatch();

  useEffect(() => {
    // 로그인 된 사용자만 호출
    if (isLogin) {
      dispatch(getCartItemsAsync());
    }
  }, [isLogin]);

  return (
    <>
      {isLogin ? (
        <div>
          <h1>장바구니</h1>
          <div>
            <b>{loginState.nickname}</b> 님의 장바구니
          </div>
          <div> 장바구니 상품 개수 : {cartItem.length}</div>
        </div>
      ) : null}
    </>
  );
};

export default CartComponent;
```

## 5. 장바구니 커스텀 훅 만들기

- /src/hooks/useCustomHook.js

```js
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsAsync, postChangeCartAsync } from "../slices/cartSlice";

const useCustomCart = () => {
  const cartItems = useSelector(state => state.cartSlice);
  const dispatch = useDispatch();

  // 가져오는 기능
  const refreshCart = () => {
    dispatch(getCartItemsAsync());
  };

  // 변경하기
  const changeCart = param => {
    dispatch(postChangeCartAsync(param));
  };

  return { cartItems, refreshCart, changeCart };
};
export default useCustomCart;
```
