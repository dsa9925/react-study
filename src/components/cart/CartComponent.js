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
