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
                <CartItemComponent {...item} email={loginState.email} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CartComponent;
