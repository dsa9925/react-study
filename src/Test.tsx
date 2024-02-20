import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { getShop } from "./API";
// interface : 객체의 구조(키:데이터종류)를 미리 설정하는 문법
interface IShopParent {
  ishop: number;
  name: string;
  location: string;
  count: number;
  pics: [];
  facilities: [];
}
// type : 객체 형태의 타입을 만들고 변수명(별명 - alias )을 만듦
// 타입 앨리어스 : 변수를 한개 만든다.
// 데이터 타입처럼 활용할 것입니다.
type TShop = {
  ishop: number;
  name: string;
  location: string;
  count: number;
  pics: [];
  facilities: [];
};

const Test = (props: TShop): JSX.Element => {
  // 제네릭 : Genric
  const [count, setCount] = useState<number>(0);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCount(parseInt(event.target.value));
  };

  useEffect(() => {
    getShop()
      .then(res => res)
      .then(result => {
        result.map(item => item.count);
      });
  }, []);

  return (
    <div>
      <button onClick={handleClick}>카운터증가</button>
      <input type="number" value={count} onChange={handleChange} />
    </div>
  );
};
export default Test;
