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
