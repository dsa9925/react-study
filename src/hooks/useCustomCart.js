import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getCartItems, postChangeCart } from "../api/cartApi";
import { atomCartState } from "../atoms/atomCartState";

const useCustomCart = () => {
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
      console.log("gogogogo");
      setCartItems(query.data);
    }
  }, [query.isSuccess]);

  // 변경하기 (API 서버에 값을 보내서 업데이트 한다.)
  const changeCart = param => {
    changeMutation.mutate(param);
  };

  // 함수를 실행하고 나면 그 결과로 객체에 기능과 변수를 돌려준다.
  return { cartItems, changeCart };
};
export default useCustomCart;
