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
          <button onClick={() => handleClickQty(-qty)}>삭제</button>
        </div>
        <p>총 구매가격 : {qty * price} 원</p>
      </div>
    </div>
  );
};

export default CartItemComponent;
