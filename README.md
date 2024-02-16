# Recoil

- 반동한다 라는 의미
- 단점 : 걱정된다(버전업이 멈춤/메인개발자 페이스북 퇴사중지)
- 장점 : 참 사용하기가 쉽다. useState 처럼 사용
- 제공기능 : 웹서비스 전체의 상태관리 제공
- 레퍼런스 : https://recoiljs.org/ko/
- 목표 : RTK 제거하고, ReactQuery 연동
- 개선기능 : 로그인 상태관리, 장바구니 상태관리

## 1. atoms 관리하는 상태 목록들

- 설치
  : `npm install recoil`
- Recoil Provider 셋팅
- index.js 에 전역 설정

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 공급을 한다. store 를 공급한다.
import { Provider } from "react-redux";
// 저장소 (전역)
import store from "./store";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </Provider>,
);
```

## 2. atom 들을 만들고 활용

- state 입니다. (전역 State )
- 현재 로그인 관련 atom / 장바구니 atom
- src/atoms 폴더 생성
- src/atoms/atomSignState.js
- 로그인 정보 관리

```js
import { atom } from "recoil";
const initState = {
  email: "",
};

export const atomSignState = atom({
  key: "atomSignState",
  default: initState,
});
```

## 3. atom 기능

- useRecoilState(아톰)

  : [getter, setter] = useRecoilState(아톰)

  : 예) [getter, setter] = useState(초기값)

- useRecoilValue(아톰)
  : Getter

- useSetRecoilState(아톰)
  : Setter

- useResetRecoilState(아톰)
  : 상태(atom)에 저장된 값 지움.

## 4. atom을 이용한 로그인 상태관리

- src/hooks/useCustomLogin.js
  : RTK 대신에 Recoil 적용
  ```js
  import { useDispatch, useSelector } from "react-redux";
  import { Navigate, useNavigate } from "react-router-dom";
  import { loginPostAsync, logout } from "../slices/loginSlice";
  import { useRecoilState, useResetRecoilState } from "recoil";
  import { atomSignState } from "../atoms/atomSignState";
  import { loginPost } from "../api/memberApi";
  import { removeCookie, setCookie } from "../util/cookieUtil";
  const useCustomLogin = () => {
    // 패스 이동하기
    const navigate = useNavigate();
    // Recoil 로그인 Atom 불러오기
    const [loginState, setLoginState] = useRecoilState(atomSignState);
    // Recoil 로그인 atom 리셋하기
    const resetSignState = useResetRecoilState(atomSignState);
    // RTK 상태값 업데이트
    // const dispatch = useDispatch();
    // RTK 상태값 읽기
    // const loginState = useSelector(state => state.loginSlice);
    // 로그인 상태값 파악
    const isLogin = loginState.email ? true : false;
    // 로그인 기능
    const doLogin = async ({ loginParam }) => {
      // 로그인 어느화면에서 실행이 될 소지가 높아요.
      // 로그인 상태 업데이트
      // RTK
      // const action = dispatch(
      //   loginPostAsync({ loginParam, successFn, failFn, errorFn }),
      // );
      // Recoil
      const result = await loginPost({ loginParam });
      // 로그인 하고 나서 쿠키저장
      // 로그인 atom 업데이트
      saveAsCookie(result);
      moveToPath("/");
      // 결과값
      return result;
    };
    const saveAsCookie = result => {
      setLoginState(result);
      setCookie("member", JSON.stringify(result), 1);
    };
    // 로그아웃 기능
    const doLogout = () => {
      // RTK
      // dispatch(logout());
      // 쿠키지우기
      removeCookie("member");
      // Recoil 리셋
      resetSignState();
    };
    // 패스이동 기능
    const moveToPath = path => {
      // 패스로 이동 후에 replace:ture 를 적용시 뒤로 가기 화면
      // 이전 페이지 기록을 남기지 않는다.
      navigate({ pathname: path }, { replace: true });
    };
    // 로그인 페이동 기능
    const moveToLogin = () => {
      console.log("페이지 이동");
      return <Navigate replace to="/member/login" />;
    };
    return {
      loginState,
      isLogin,
      doLogin,
      doLogout,
      moveToPath,
      moveToLogin,
      saveAsCookie,
    };
  };
  export default useCustomLogin;
  ```

## 5. 카카오 로그인

- src/pages/KakaoRedirectPage.js

```js
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const KakaoRedirectPage = () => {
  const [uRLSearchParams, setURLSearchParams] = useSearchParams();
  // 인증코드 파악하기
  const authCode = uRLSearchParams.get("code");

  // 로그인 과정을 위한 loginSlice 을 통해서 로그인시도
  // const dispatch = useDispatch();
  const { moveToPath, saveAsCookie } = useCustomLogin();

  // 인증코드로 Access Token 요청하기
  useEffect(() => {
    getAccessToken(authCode).then(accessToken => {
      console.log("access Token", accessToken);
      // 개인 정보 호출
      getMemberWithAccessToken(accessToken).then(memberInfo => {
        console.log("-------------------");
        console.log(memberInfo);
        // API 백엔드 서버로 로그인을 시도합니다.

        // dispatch(login(memberInfo));
        saveAsCookie(memberInfo);

        // 소셜회원이 아니라면
        if (memberInfo && !memberInfo.social) {
          // 첫페이지로 이동
          moveToPath("/");
        } else {
          // 정보 수정창으로 이동
          moveToPath("/member/modify");
        }
      });
    });
  }, [authCode]);

  return (
    <div>
      <h1>카카오 리다이렉트 페이지</h1>
      <div>{authCode}</div>
    </div>
  );
};

export default KakaoRedirectPage;
```

## 6. ReactQuery 와 Recoil 이용한 장바구니 상태관리

- 1번 atmo 만들기
- 2번 Selector 활용하기
- src/atoms/atomCartState.js

### 6.1. Selector 란

- 원래는 default 에 [] 밖에 없다.
- 추가적으로 atom 이 업데이트 되면 상품목록이 추가된다
- atom 의 상태가 바뀐다.
- 우리는 atom 담겨진 배열 안쪽의 내용을 기반으로
- 총 가격을 자동으로 업데이트 하고 싶다.

```js
import { atom, selector } from "recoil";

export const atomCartState = atom({
  key: "atomCartState",
  default: [],
});
// Selector 활용
// 상품에 담긴 가격들을 모아서 총가격을 관리한다.
export const atomCartTotalState = selector({
  key: "atomCartTotalState",
  // 어느 atom 이 변하면 될것인지 대상을 지정
  get: ({ get }) => {
    const arr = get(atomCartState);
    // 배열에 요소를 반복하면서 가격을 합산한다.
    const totalPrice = arr.reduce(
      (total, current) => total + current.price * current.qty,
    );
    return totalPrice;
  },
});
```

### 6.2. 장바구니 데이터 처리

- src/hooks/useCustomCart.js

```js
// import { useDispatch, useSelector } from "react-redux";
import { useRecoilState } from "recoil";
import { getCartItemsAsync, postChangeCartAsync } from "../slices/cartSlice";
import { atomCartState } from "../atoms/atomCartState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCartItems, postChangeCart } from "../api/cartApi";
import { useEffect } from "react";

// 함수이다. 함수는 실행 후 값을 리턴한다.
const useCustomCart = () => {
  // 웹앱 전체에 적용한 state 읽기 ( useSelector 를 사용)
  //  cartSlice 를 통해 state 를 읽는다.
  // const cartItems = useSelector(state => state.cartSlice);
  // 웹앱 전체에 적용한 state 수정하기 ( useDispatch 를 사용)
  // const dispatch = useDispatch();

  // Recoil 장바구니 atom
  const [cartItems, setCartItems] = useRecoilState(atomCartState);

  // ReactQuery Clinet 활용
  const client = useQueryClient();
  // API 호출로 장바구니 수정
  const changeMutation = useMutation({
    mutationFn: param => postChangeCart(param),
    onSuccess: result => {
      setCartItems(result);
    },
  });

  // 자료 가져오기
  const query = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
    staleTime: 1000 * 60,
  });

  // 위 과정 호출후 isSuccess 가 되면 업데이트
  useEffect(() => {
    if (query.isSuccess) {
      client.invalidateQueries("cart");
      setCartItems(query.data);
    }
  }, [query.isSuccess]);

  // 가져오는 기능 (API 서버 연동해서 장바구니 목록 가져오기)
  // const refreshCart = () => {
  //   // 아래 코드는 cartSlice 에 작성한 미들웨어함수
  //   // dispatch(getCartItemsAsync());
  // };

  // 변경하기 (API 서버에 값을 보내서 업데이트 한다.)
  const changeCart = param => {
    // dispatch(postChangeCartAsync(param));
    changeMutation.mutate(param);
  };

  // 함수를 실행하고 나면 그 결과로 객체에 기능과 변수를 돌려준다.
  return { cartItems, changeCart };
};
export default useCustomCart;
```

### 6.3. 장바구니 컴포넌트 처리

- src/components/CartComponent.js

```js
import React, { useEffect } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsAsync } from "../../slices/cartSlice";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "./CartItemComponent";
import { useRecoilState, useRecoilValue } from "recoil";
import { atomCartTotalState } from "../../atoms/atomCartState";

const CartComponent = () => {
  // 로그인 정보를 이용(웹앱 전체에 state 관련 기능 모음 - 로그인)
  const { isLogin, loginState } = useCustomLogin();
  const { cartItems, changeCart } = useCustomCart();
  const [totalPrice, setTotalPrice] = useRecoilState(atomCartTotalState);
  // const totalPrice = useRecoilValue(atomCartTotalState);

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
                <CartItemComponent
                  {...item}
                  email={loginState.email}
                  changeCart={changeCart}
                />
              </div>
            ))}
          </div>
          <div>총 장바구니 가격 : {totalPrice}</div>
        </div>
      ) : null}
    </>
  );
};

export default CartComponent;
```

### 6.4. 장바구니 각 아이템 컴포넌트 처리

- src/components/CartItemComponent.js

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
  changeCart,
}) => {
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
          <button onClick={() => handleClickQty(-qty)}>삭제</button>
        </div>
        <p>총 구매가격 : {qty * price} 원</p>
      </div>
    </div>
  );
};

export default CartItemComponent;
```

### 6.5. RTK 제거

- index.js

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 공급을 한다. store 를 공급한다.
import { Provider } from "react-redux";
// 저장소 (전역)
import store from "./store";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <Provider store={store}>
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  // </Provider>,
);
```

### 6.6. 새로고침시 정보유지

```js
import { atom } from "recoil";
import { getCookie } from "../util/cookieUtil";

const initState = {
  email: "",
};
const loadMemberCookie = () => {
  const memberInfo = getCookie("member");
  return memberInfo;
};

export const atomSignState = atom({
  key: "atomSignState",
  default: loadMemberCookie() || initState,
});
```
