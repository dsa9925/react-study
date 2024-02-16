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
