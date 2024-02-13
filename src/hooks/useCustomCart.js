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
