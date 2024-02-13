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