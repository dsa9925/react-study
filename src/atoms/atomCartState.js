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
    const 초기값 = 0;
    const totalPrice = arr.reduce(
      (total, current) => total + current.price * current.qty,
      초기값,
    );

    return totalPrice;
  },
});
