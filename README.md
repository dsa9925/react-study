# 타입스크립트 1

## 1. 기존 프로젝트(CRA로 생성)에 셋팅하기

- npx create-react-app ./ 으로 생성

### 1.1. 관련 패키지 설치

`npm install --save-dev typescript @types/node @types/react @types/react-dom @typescript-eslint/eslint-plugin @typescript-eslint/parser css-loader style-loader`

### 1.2. tsconfig.json 생성 및 설정

- 설치 : `npx tsc --init`
- tsconfig.json 환경 셋팅

```js
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Language and Environment */
    "target": "ES2016" /* TypeScript 가 JS 로 변환하는 버전 */,
    "lib": [
      "dom",
      "dom.Iterable"
    ] /* Specify a set of bundled library declaration files that describe the target runtime environment. */,
    "jsx": "react-jsx" /* JSX를 처리하는 방식( next.js 에서는 preserve) */,

    "module": "commonjs" /* 모듈 코드 생성 JS 버전 */,

    /* JavaScript Support */
    "allowJs": true /* js 파일을 컴파일에 포함시킬지 여부 */,
    "noEmit": true /* 출력파일을 생성할지 말지 결정 */,
    "esModuleInterop": true /* ES모듈과 CommonJS 모듈간의 상호 연동 가능 */,
    "forceConsistentCasingInFileNames": true /* import 하는 경우 대소문자 구분 */,

    /* Type Checking */
    "strict": true /* JS 엄격모드 는 필수 사항 */,
    "skipLibCheck": true /* 타입스크립트 라이브러리 정의 파일 검토 생략 ( .d.ts files.) */
  }
}

```

### 1.3. eslintrc.js 환경 셋팅

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "**/tsconfig.json",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-unused-vars": "off",
    "react/jsx-no-target-blank": "off",
    // "no-undef": "off",
  },
};
```

### 1.4. 타입스크립트 테스트해보기

- 파일확장자 규칙
  : 파일명.js ===> 파일명.ts
  : 컴포넌트.js ===> 파일명.tsx
  : src/pages/MemoPage.js ===> src/pages/MemoPage.tsx

### 1.5. 타입스크립트 정의 파일 생성

- 예) svg 파일을 활용하시면 ts 에러가 발생함.
- src/react-app-env.d.ts 생성

```js
declare module "*.svg" {
  const content: any;
  export default content;
}
```

### 1.6. .gitignore 내용 포함

- /src/reportWebVitals.ts

## 2. 신규 프로젝트에 생성하기

`npx create-react-app ./ --template typescript`

## 3. 타입스크립트 사용하는 이유

- 코드 작성중 오류를 미리 제거하기 위한 용도
- 데이터의 종류(타입) 를 확인해 준다.
- 전달해 주는 데이터(함수의 파라메터)
- 리턴(결과값)해 주는 데이터타입(함수의 리턴값)

- /src/test.js 생성

```js
// 코드 작성 중에는 에러 미발생
// 코드 활용 평상시 에도 정상작동
// 언젠가 발생합니다.
// 코드 작성중에 체크하자가 TS
function add(a, b) {
  return a + b;
}
add(10, 20);
add(10, "20");
```

```js
// 코드 작성 중에는 에러 미발생
// 코드 활용 평상시 에도 정상작동
// 언젠가 발생합니다.
// 코드 작성중에 체크하자가 TS
function add(a, b) {
  if (typeof a !== "number") {
    return "에러입니다.";
  }
  if (typeof b !== "number") {
    return "에러입니다.";
  }
  return a + b;
}
add(10, 20);
add(10, "20");
```

- /src/test.js =====> test.ts

## 4. 핸드북

- https://typescript-kr.github.io/pages/the-handbook.html

- 지극히 제 개인적 사견
  : React 에 일단 적용
  : 컴포넌트 만들기, props, useState, event, axios 에 TS 적용
  : 기본 문법, Chat Gpt, 구글링

## 5. 기초문법

### 5.1. 변수 타입(종류)

```js
// 빨간줄 안생기면 그대로 두세요.
// 타입(값의종류)을 TS 에 유추하면 손대지마세요.
// 타입 추론이 정상적이면 그냥 두세요.
// 타입추론
let age: number = 50;
const nicName: string = "홍길동";
let isFlag: boolean = false;
let isNo: any = null;
let isUn: any = undefined;
let isSymbol: symbol = Symbol();
let isArr: any[] = [];
let isArr2: number[] = [1, 2, 3];
let isArr3: (string | number)[] = [1, "안녕", 3];
let isObj: {} = {};
let Props: {
  pno: number,
  pname: string,
} = { pno: 1, pname: "장난감" };

const State: {
  pno: number,
  pname: string,
  onChange: () => void,
} = { pno: 1, pname: "장난감", onChange: function () {} };
```

```js
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
  {
    ishop: 3,
    name: "팔각도",
    location: "삼덕동1가 63-11",
    count: 33,
    pics: [
      "a111be25-0c4a-4a1e-91b8-33bc747febdd.jpg",
      "a4d28843-9247-4190-a77b-53e71d3de4b3.jpg",
    ],
    facilities: ["단체 가능", "와이파이", "예약 가능", "화장실구분"],
  },
  {
    ishop: 4,
    name: "js가든",
    location: "계산동2가 200",
    count: 33,
    pics: [
      "e5c2d247-d419-4038-b376-705f01b15b3a.jpg",
      "136dd470-285e-423b-9c28-0eaf914800ba.jpg",
    ],
    facilities: [],
  },
  {
    ishop: 5,
    name: "국일생갈비",
    location: "대구 중구 국채보상로 492 ",
    count: 33,
    pics: [
      "e6c9b6f2-4062-4a3a-8bde-fe96539148c9.jpg",
      "5e5060a3-2e59-4c31-98c1-a4d21acd4f9d.jpg",
    ],
    facilities: [
      "주차장",
      "단체 가능",
      "포장가능",
      "와이파이",
      "예약 가능",
      "화장실구분",
    ],
  },
  {
    ishop: 6,
    name: "목구멍",
    location: "종로2가 25-1",
    count: 33,
    pics: [
      "2d5e125f-085e-4da7-868e-d9da0cdb15bb.jpg",
      "1a24fe22-0a00-4946-b3be-3b64b1ac15cd.jpg",
    ],
    facilities: ["단체 가능", "와이파이", "예약 가능", "화장실구분"],
  },
  {
    ishop: 7,
    name: "더부처스",
    location: "대구 중구 달구벌대로440길 9-18 1층",
    count: 33,
    pics: [
      "e4985079-788f-4211-9dc1-da3fdc230b52.jpg",
      "0a6bf272-1b4a-4c76-9bfe-dc8bc455beb8.jpg",
    ],
    facilities: ["주차장", "와이파이", "예약 가능"],
  },
  {
    ishop: 8,
    name: "돗소리 종로점",
    location: "대구 중구 종로 24-1",
    count: 33,
    pics: [
      "67c3e7e3-b9c5-492f-a06f-5a12f472c66e.jpg",
      "746cfd05-980d-413f-8c8f-dd5cbfe8dd07.jpg",
    ],
    facilities: ["단체 가능", "와이파이", "예약 가능"],
  },
  {
    ishop: 9,
    name: "혜옥당 종로본점",
    location: "대구 중구 중앙대로81길 28 지상1, 2층",
    count: 33,
    pics: [
      "955d4299-4f2e-4d48-8afd-9f5e9f10eb8e.jpg",
      "c84ad4fc-f817-43ab-8ef8-df5e513a9201.jpg",
    ],
    facilities: ["단체 가능", "와이파이", "예약 가능", "화장실구분"],
  },
  {
    ishop: 10,
    name: "음밀한양",
    location: "대구 중구 달구벌대로450길 10",
    count: 33,
    pics: [
      "729ea550-4f31-4141-bde1-be5b2c54c09a.jpg",
      "4fae44f8-5bee-42fd-8adc-a3cc59efd04e.jpg",
      "02ae0cfe-b970-419a-8430-4c10fb9c7b16.jpg",
    ],
    facilities: [
      "단체 가능",
      "포장가능",
      "와이파이",
      "예약 가능",
      "반려동물",
      "간편결제",
    ],
  },
];
```

## 5. 리액트 활용

## 5.1 컴포넌트 활용

- src/Test.js 생성

```js
import React from "react";

const Test = () => {
  return <div>Test</div>;
};

export default Test;
```

- JSX 를 리턴값으로 활용
- src/Test.js ====> src/Test.ts (X)
- src/Test.js ====> src/Test.tsx (O)

  ```txt
  function 함수명():리턴값종류 {
        return 값
    }

    const 함수명 = ():리턴값종류 => 값


    function 함수명():리턴값종류 {
        return JSX (html)
    }

    const 함수명 = ():리턴값종류 => JSX (html)

    타입에 대한 추론을 VSCode 에 맡겨라

    const 함수명 = ():리턴값종류 => JSX (html)

    VSCode 코드 힌트
    const Test: () => React.JSX.Element
  ```

: step 1

```ts
import React from "react";
const Test = () => {
  return <div>Test</div>;
};

export default Test;
```

: step 2 (타입추론을 확인)

```ts
import React from "react";

const Test = (): React.JSX.Element => {
  return <div>Test</div>;
};

export default Test;
```

: step 3 (타입작성)

```ts
import React from "react";

const Test = (): JSX.Element => {
  return <div>Test</div>;
};

export default Test;
```

- 참고사항

```ts
import React from "react";

export default function Test(): JSX.Element {
  return <div>Test</div>;
}
```

```ts
import React from "react";
function Test(): JSX.Element {
  return <div>Test</div>;
}
export default Test;
```

## 5.2 useState 활용

```ts
import React, { useState } from "react";
const Test = (): JSX.Element => {
  const [count, setCount] = useState(0);
  return <div>Test</div>;
};
export default Test;
```

```ts
import React, { useState } from "react";
const Test = (): JSX.Element => {
  // 제네릭 : Genric
  const [count, setCount] = useState<number>(0);
  return <div>Test</div>;
};
export default Test;
```

## 5.2 Event Handler 활용

- 가능하면 외우세요. (2개정도)
  : onClick

```ts
import React, { MouseEvent, useState } from "react";
const Test = (): JSX.Element => {
  // 제네릭 : Genric
  const [count, setCount] = useState<number>(0);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
  };
  return (
    <div>
      <button onClick={handleClick}>카운터증가</button>
    </div>
  );
};
export default Test;
```

: onChange

```ts
import React, { ChangeEvent, MouseEvent, useState } from "react";
const Test = (): JSX.Element => {
  // 제네릭 : Genric
  const [count, setCount] = useState<number>(0);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCount(parseInt(event.target.value));
  };
  return (
    <div>
      <button onClick={handleClick}>카운터증가</button>
      <input type="number" value={count} onChange={handleChange} />
    </div>
  );
};
export default Test;
```

## 5.3 props 활용

- 컴포넌트에 전달되는 props 는 객체형태입니다.

```txt
fucntion 함수명(매개변수) {
    return 리턴값
   }

   fucntion 함수명(매개변수:데이터타입):리턴타입 {
    return 리턴값
   }

   const 변수 = (매개변수) => {
    return 리턴값
   }

   const 변수 = (매개변수:데이터타입):리턴타입 => {
      return 리턴값
   }
```

- step 1.

```ts
import React, { ChangeEvent, MouseEvent, useState } from "react";
const Test = (props: {
  ishop: number;
  name: string;
  location: string;
  count: number;
  pics: [];
  facilities: [];
}): JSX.Element => {
  // 제네릭 : Genric
  const [count, setCount] = useState<number>(0);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCount(parseInt(event.target.value));
  };
  return (
    <div>
      <button onClick={handleClick}>카운터증가</button>
      <input type="number" value={count} onChange={handleChange} />
    </div>
  );
};
export default Test;
```

- step 2: 인터페이스 활용

```ts
import React, { ChangeEvent, MouseEvent, useState } from "react";

// interface : 객체의 구조(키:데이터종류)를 미리 설정하는 문법
interface IShop {
  ishop: number;
  name: string;
  location: string;
  count: number;
  pics: [];
  facilities: [];
}

const Test = (props: IShop): JSX.Element => {
  // 제네릭 : Genric
  const [count, setCount] = useState<number>(0);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCount(parseInt(event.target.value));
  };
  return (
    <div>
      <button onClick={handleClick}>카운터증가</button>
      <input type="number" value={count} onChange={handleChange} />
    </div>
  );
};
export default Test;
```

- step 2: 타입앨리어스 활용

```ts
import React, { ChangeEvent, MouseEvent, useState } from "react";

// interface : 객체의 구조(키:데이터종류)를 미리 설정하는 문법
interface IShop {
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
  return (
    <div>
      <button onClick={handleClick}>카운터증가</button>
      <input type="number" value={count} onChange={handleChange} />
    </div>
  );
};
export default Test;
```

- interface 와 type 중 어느 것으로 타입을 만들까?
  : 특징(문법상의 장단점)을 알아두자
  : 회사 마다 개발자 마다 선호도가 다르다.
  : interface 는 동일한 이름으로 여러 번 만들 수 있다.
  : interface 는 다른 interface 를 확장(기능추가)할 수 있다.
  : type 은 한번 만들면 다시는 새로 정의할 수 없다. (마치 const)

## 5.3 axios 활용(GET)

- src/API.js

```js
import axios from "axios";

export const getShop = async () => {
  try {
    const res = axios.get("주소");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
```

- src/API.ts : 파일명 변환

- step 1

```ts
import axios from "axios";

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

export const getShop = async () => {
  try {
    const res = axios.get("주소");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
```

- step 2

```js
import axios from "axios";

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

export const getShop = async (): Promise<IShop[]> => {
  const response = await axios.get<IShop[]>("실제 요청 URL");
  return response.data; // 서버에서 받은 데이터를 반환
};

```

- step 3 개선하기

```js
import axios from "axios";

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

```

## 5.4 axios 활용(POST)

- step 1.

```ts
import axios from "axios";

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
export const postShop = async <TShop, TShopData>(
  postData: TShopData,
): Promise<TShop> => {
  const response = await axios.post<TShop>("주소", postData);
  return response.data; // 서버에서 받은 데이터를 반환
};
```

- step 2

```ts
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
```

## 6. Generic

- 함수나 클래스를 만들 때 "어떤 타입"을 사용할지 미리 정하지 않고,
- 함수나 클래스를 사용할 때 그때그때 원하는 타입을 지정할 수 있어요.
- 타입 별칭(type alias) 를 마치 함수의 매개변수로 전달하는 느낌이다.

```js
const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
  console.log(event.target);
};
........
interface MouseEvent<T = Element, E = NativeMouseEvent> extends UIEvent<T, E> {}
........
```
