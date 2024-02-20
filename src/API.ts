import axios, { AxiosResponse } from "axios";

// Swagger 에서 돌려주는 값
const dummy = [
  {
    ishop: 1,
    name: "고기굽는남자",
    location: "삼덕동1가 32-10",
    count: 33,
    pics: [
      "22f6a12a-63d9-4c96-a55d-a297d7e2083f.jpg",
      "28bc248f-873d-44ac-bf31-a59fa7be485a.jpg",
      "0d9969ca-dde8-4d42-9b10-3caa87e1aca0.jpg",
    ],
    facilities: ["단체 가능", "예약 가능", "화장실구분"],
  },
  {
    ishop: 2,
    name: "실비소갈비",
    location: "삼덕동2가 132",
    count: 33,
    pics: [
      "0d1cedd2-b347-4772-ac4f-d00f9346a040.jpg",
      "7a902bcb-45b5-4736-a475-24e1d2247c4e.jpg",
    ],
    facilities: ["주차장", "단체 가능", "와이파이", "화장실구분"],
  },
];
// 더미 결과물에 대한 interface 또는 type 으로 정리
// chat 한테 물어보세요.
interface IShop {
  ishop: number;
  name: string;
  location: string;
  count: number;
  pics: string[];
  facilities: string[];
}

type TShop = {
  ishop: number;
  name: string;
  location: string;
  count: number;
  pics: string[];
  facilities: string[];
};

// 유니온 ( | )
//   A  |  B
//   A 또는  B
//   IShop[] | undefined

// 인터섹션 ( & )
//  A & B
//  A 그리고 B

export const getShop = async <T = TShop>(): Promise<T[]> => {
  const response = await axios.get<T[]>("실제 요청 URL");
  return response.data; // 서버에서 받은 데이터를 반환
};

// 보내주어야 하는 데이터의 타입으로 정의한다.
type TShopData = {
  pk: number;
  goodName: string;
};
// R 은 전달할 타입 모양
// T 는 돌려받을 타입 모양
export const postShop = async <T = TShop, R = TShopData>(
  postData: R,
): Promise<T> => {
  const response = await axios.post<T, AxiosResponse<T>, R>("주소", postData);
  return response.data; // 서버에서 받은 데이터를 반환
};
