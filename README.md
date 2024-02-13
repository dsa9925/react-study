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

// 함수이다. 함수는 실행 후 값을 리턴한다.
const useCustomCart = () => {
  // 웹앱 전체에 적용한 state 읽기 ( useSelector 를 사용)
  //  cartSlice 를 통해 state 를 읽는다.
  const cartItems = useSelector(state => state.cartSlice);
  // 웹앱 전체에 적용한 state 수정하기 ( useDispatch 를 사용)
  const dispatch = useDispatch();

  // 가져오는 기능 (API 서버 연동해서 장바구니 목록 가져오기)
  const refreshCart = () => {
    // 아래 코드는 cartSlice 에 작성한 미들웨어함수
    dispatch(getCartItemsAsync());
  };

  // 변경하기 (API 서버에 값을 보내서 업데이트 한다.)
  const changeCart = param => {
    dispatch(postChangeCartAsync(param));
  };

  // 함수를 실행하고 나면 그 결과로 객체에 기능과 변수를 돌려준다.
  return { cartItems, refreshCart, changeCart };
};
export default useCustomCart;
```

## 6. 장바구니 커스텀 훅 사용하기

- src/components/cart/CartComponent.js

```js
import React, { useEffect } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsAsync } from "../../slices/cartSlice";
import useCustomCart from "../../hooks/useCustomCart";

const CartComponent = () => {
  // 로그인 정보를 이용(웹앱 전체에 state 관련 기능 모음 - 로그인)
  const { isLogin, loginState } = useCustomLogin();

  // =============== 커스텀 훅을 사용하지 않고 진행한 경우

  // 장바구니 정보(웹앱 전체에 state 기능 ) 가져오기
  // RTK 의 cartSlice 의 state 정보 읽기
  // 정보를 읽어서 state 로 화면을 업데이트 하겠다.
  // const cartItem = useSelector(state => state.cartSlice);
  // 컴포넌트의 state 인경우는   const [읽기, _] = useState(값)

  // API 백엔드 서버 호출 후 cartSlice 상태값 업데이트
  // const dispatch = useDispatch();
  // 컴포넌트의 state 인경우는   const [_, 쓰기] = useState(값)
  // ========================   커스텀 훅을 사용하지 않은 경우

  const { cartItems, refreshCart } = useCustomCart();

  useEffect(() => {
    // 로그인 된 사용자만 호출
    if (isLogin) {
      // 직접 호출한 경우
      // dispatch(getCartItemsAsync());
      // 커스텀 훅 활용
      refreshCart();
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
          <div> 장바구니 상품 개수 : {cartItems.length}</div>
        </div>
      ) : null}
    </>
  );
};

export default CartComponent;
```

## 7. 장바구니에 담긴 아이템 출력하기

- src/components/cart/CartItemComponent.js 생성

```js
import React from "react";

const CartItemComponent = () => {
  return <div>CartItemComponent</div>;
};

export default CartItemComponent;
```

## 8. 컴포넌트 반복해서 출력하기

- src/components/cart/CartComponent.js

```js
import React, { useEffect } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsAsync } from "../../slices/cartSlice";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "./CartItemComponent";

const CartComponent = () => {
  // 로그인 정보를 이용(웹앱 전체에 state 관련 기능 모음 - 로그인)
  const { isLogin, loginState } = useCustomLogin();

  // =============== 커스텀 훅을 사용하지 않고 진행한 경우

  // 장바구니 정보(웹앱 전체에 state 기능 ) 가져오기
  // RTK 의 cartSlice 의 state 정보 읽기
  // 정보를 읽어서 state 로 화면을 업데이트 하겠다.
  // const cartItem = useSelector(state => state.cartSlice);
  // 컴포넌트의 state 인경우는   const [읽기, _] = useState(값)

  // API 백엔드 서버 호출 후 cartSlice 상태값 업데이트
  // const dispatch = useDispatch();
  // 컴포넌트의 state 인경우는   const [_, 쓰기] = useState(값)
  // ========================   커스텀 훅을 사용하지 않은 경우

  const { cartItems, refreshCart } = useCustomCart();

  useEffect(() => {
    // 로그인 된 사용자만 호출
    if (isLogin) {
      // 직접 호출한 경우
      // dispatch(getCartItemsAsync());
      // 커스텀 훅 활용
      refreshCart();
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
          <div> 장바구니 상품 개수 : {cartItems.length}</div>
          <div>
            {/* 각각의 장바구니 담긴 제품을 보여준다. */}
            {cartItems.map((item, index) => (
              <div key={index}>
                <CartItemComponent />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CartComponent;
```

## 9. 장바구니의 각 상품 아이템 컴포넌트 자료 전달하기

```js
<div>
  {/* 각각의 장바구니 담긴 제품을 보여준다. */}
  {cartItems.map((item, index) => (
    <div key={index}>
      <CartItemComponent item={item} />
    </div>
  ))}
</div>
```

```js
import React from "react";

const CartItemComponent = ({ item }) => {
  return <div>CartItemComponent</div>;
};

export default CartItemComponent;
```

## 10. 장바구니 상품 담기

- src/components/product/ProductReadComponent.js

```js
import React, { useEffect, useState } from "react";
import { getOne } from "../../api/productApi";
import { API_SERVER_HOST } from "../../api/todoApi";
import Fetching from "../common/Fetching";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomLogin from "../../hooks/useCustomLogin";
// 이미지 API 주소
const host = API_SERVER_HOST;

// 화면 출력 상태 정보
const initState = {
  pno: 0,
  pname: "",
  price: 0,
  pdesc: "",
  delFlag: false,
  files: [],
  uploadFileNames: [],
};

const ProductReadComponent = ({ pno }) => {
  const [product, setProduct] = useState(initState);
  // 로딩창
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    getOne({ pno, successFn, failFn, errorFn });
  }, []);

  const successFn = result => {
    setFetching(false);
    console.log(result);
    setProduct(result);
  };
  const failFn = result => {
    setFetching(false);
    console.log(result);
  };
  const errorFn = result => {
    setFetching(false);
    console.log(result);
  };

  const { moveToModify, moveToList, page } = useCustomMove();

  // 사용자 정보를 이용해서 장바구니 담기
  const { loginState } = useCustomLogin();
  // 장바구니 관련 RTK state 사용
  const { cartItems, refreshCart, changeCart } = useCustomCart();

  const handleClickAddCart = () => {
    // console.log(pno);
    // console.log(typeof pno);
    // 상품은 보통 1개를 담는다.
    let qty = 1;
    // 현재 장바구니에 동일한 상품이 담겼는지 아닌지 구분
    // 1. 이미 상품이 담겨있다면 개수를 1개 증가
    let addItem = cartItems.filter(item => item.pno === parseInt(pno));
    addItem = addItem[0];
    // console.log(addItem);
    // 현재 상품이 장바구니에 있다.
    // addItem 이 비어 있는 배열이 아니라는 것
    if (addItem) {
      // 상품이 이미 있다면
      // js 를 이용하여 입력창 띄워보기
      if (window.confirm("이미 상품이 있습니다. 추가하시겠습니까?") === false) {
        return;
      }
      // 사용자 추가 구매를 시도함.
      addItem.qty += 1;
      qty = addItem.qty;
    }

    // 장바구니에 상품을 담고 RTK 의 state 를 업데이트
    changeCart({ email: loginState.email, pno: pno, qty: qty });
  };

  return (
    <div>
      {fetching ? <Fetching /> : null}
      <div>
        <div>제품번호: {product.pno}</div>
      </div>
      <div>
        <div>제품이름: {product.pname}</div>
      </div>
      <div>
        <div>제품설명: {product.pdesc}</div>
      </div>
      <div>
        {product.uploadFileNames.map((item, index) => (
          <img key={index} src={`${host}/api/products/view/s_${item}`} />
        ))}
      </div>
      <div>
        <button onClick={() => handleClickAddCart()}>장바구니담기</button>
        <button onClick={() => moveToModify(product.pno)}>수정</button>
        <button onClick={() => moveToList({ page })}>목록가기</button>
      </div>
    </div>
  );
};

export default ProductReadComponent;
```

## 11. 장바구니 아이템 내용 출력하기

- src/components/cart/CartItemComponent.js
- API 에서 Response 한 결과를 기반으로 Props 정의

```js
import React from "react";

const CartItemComponent = ({ cino, qty, pno, pname, price, imageFile }) => {
  return <div>CartItemComponent</div>;
};

export default CartItemComponent;
```

## 12. Props 를 객체로 전달하기

- src/components/cart/CartComponent.js

```js
import React, { useEffect } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsAsync } from "../../slices/cartSlice";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "./CartItemComponent";

const CartComponent = () => {
  // 로그인 정보를 이용(웹앱 전체에 state 관련 기능 모음 - 로그인)
  const { isLogin, loginState } = useCustomLogin();

  // =============== 커스텀 훅을 사용하지 않고 진행한 경우

  // 장바구니 정보(웹앱 전체에 state 기능 ) 가져오기
  // RTK 의 cartSlice 의 state 정보 읽기
  // 정보를 읽어서 state 로 화면을 업데이트 하겠다.
  // const cartItem = useSelector(state => state.cartSlice);
  // 컴포넌트의 state 인경우는   const [읽기, _] = useState(값)

  // API 백엔드 서버 호출 후 cartSlice 상태값 업데이트
  // const dispatch = useDispatch();
  // 컴포넌트의 state 인경우는   const [_, 쓰기] = useState(값)
  // ========================   커스텀 훅을 사용하지 않은 경우

  const { cartItems, refreshCart } = useCustomCart();

  useEffect(() => {
    // 로그인 된 사용자만 호출
    if (isLogin) {
      // 직접 호출한 경우
      // dispatch(getCartItemsAsync());
      // 커스텀 훅 활용
      refreshCart();
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
          <div> 장바구니 상품 개수 : {cartItems.length}</div>
          <div>
            {/* 각각의 장바구니 담긴 제품을 보여준다. */}
            {cartItems.map((item, index) => (
              <div key={index}>
                <CartItemComponent {...item} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CartComponent;
```

## 13. 장바구니 아이템 출력 및 개수 조절

- src/components/cart/CartItemComponent.js

```js
import React from "react";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomCart from "../../hooks/useCustomCart";
const host = API_SERVER_HOST;
const CartItemComponent = ({
  email,
  cino,
  qty,
  pno,
  pname,
  price,
  imageFile,
}) => {
  const { changeCart } = useCustomCart();
  // 상품갯수 변경
  const handleClickQty = amount => {
    changeCart({ email: email, pno: pno, qty: qty + amount, cino });
  };

  return (
    <div>
      <div>
        <img src={`${host}/api/products/view/s_${imageFile}`} />
      </div>
      <div>
        <p>장바구니 번호 : {cino} </p>
        <p>제품번호 : {pno} </p>
        <p>상품명 : {pname} </p>
        <p>가격 : {price} 원</p>
      </div>
      <div>
        <p>구매갯수 : {qty}</p>
        <div>
          <button onClick={() => handleClickQty(1)}>더하기</button>
          <button onClick={() => handleClickQty(-1)}>빼기</button>
        </div>
      </div>
      <div>
        <div>
          <button onClick={() => handleClickQty(0)}>삭제</button>
        </div>
        <p>총 구매가격 : {qty * price} 원</p>
      </div>
    </div>
  );
};

export default CartItemComponent;
```

## 14. 장바구니 추가 props 전달

- src/components/cart/CartComponent.js

```js
## 13. 장바구니 아이템 출력 및 개수 조절
```
