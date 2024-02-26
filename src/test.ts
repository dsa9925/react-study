function add(a: number, b: number): number {
  return a + b;
}
let result = add(1, 2);

const sum = (a: string, b: string): string => a + b;
let result2 = sum("사랑", "해요");

interface Restaurant {
  ishop: number;
  name: string;
  location: string;
  count: number;
  pics: string[];
  facilities: string[];
}

const 고기집: Restaurant[] = [
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

const arr: number[] = [1, 2, 3, 4, 5];

function reverse(array: number[]): number[] {
  return array.reverse();
}


const citys: string[] = ["서울", "대전", "대구", "부산"];
function reverseStr(array: string[]): string[] {
  return array.reverse();
}

const sortCity: string[] = reverseStr(citys);

function reverseGeneric(array: number[]): number[] {
  return array.reverse();
}
const go: number[] = reverse(arr);
reverseGeneric(go)