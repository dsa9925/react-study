# Memoization (메모이제이션)

- 리액트에서 변수, 함수, 컴포넌트 메모해두자.
- 메모를 해두면 필요할 때 마다 꺼내 쓸수 있다.
- 메모를 해둔 변수, 함수, 컴포넌트는 새로 랜더링 되더라도 유지
- Hook 들은 모두 메모가 된다.

## 1. 메모이제이션 의 종류는 3가지

- useMemo() : 변수 메모한다.
- useCallback() : 함수 메모한다.
- React.Memo() : 컴포넌트를 메모한다.
- 위의 함수를 이용하면 리랜더링시 유지 된다.

## 2. 샘플코드

- src/pages/MemoPage.js 생성

```js
import React, { useState } from "react";

const MemoPage = () => {
  console.log("Rerendering 되었어요.");
  let countJS = 0;
  const [countState, setCountState] = useState(0);
  const onClickJS = () => {
    countJS += 1;
    console.log("자바스크립트 변수 countJS", countJS);
  };
  const onClickState = () => {
    setCountState(countState + 1);
    console.log("======>State 변수 countState", countState);
  };
  return (
    <div>
      <div>Memoizatio Test</div>
      <div>
        <p>자바스크립트 변수 countJS : {countJS}</p>
        <button onClick={onClickJS}>자바스크립트 변수 1 증가</button>
      </div>
      <div>
        <p>State 변수 countState : {countState}</p>
        <button onClick={onClickState}>State 변수 1 증가</button>
      </div>
      <div></div>
    </div>
  );
};

export default MemoPage;
```

## 3. 라우터 셋팅

- src/router/root.js

```js
  {
    path: "/memo",
    element: <MemoPage />,
  },
```

## 4. 실행

- http://localhost:3000/memo

## 5. 리랜더링

- js 코드를 다시 ~~ 처음부터 실행한다.
- 중요한 것은 처음부터 다시 코드를 실행합니다.
  : 모든 변수가 다시 읽혀서 실행되고, 만들어집니다.
  : 모든 함수가 다시 읽혀서 실행되고, 만들어집니다.
  : JSX 로 작성한 HTML 도 다시 읽혀서 만들어집니다.
  : 성능에 안좋은 경우가 많습니다.
  : 이부분을 개선하는 것이 성능 최적화 중에 하나입니다.

- 그러나 웹브라우저에 보관하고 있는 코드도 있어요.
  : Hook 이라고 만든 것들은 다시 읽히지 않습니다.
  : 보관하고 있어요.

- 리랜더링에서 제외를 하고 리액트에서 보관하는 것을 목적
  : 일반적 변수를 보관하겠다. useMemo( 함수, [] )
  : 일반적 함수를 보관하겠다. useCallback( 함수, [])
  : JSX 를 보관하겠다. memo(컴포넌트)

## 6. useMemo를 이용한 일반 변수 보관

```js
// useMemo (함수, [변하는값] ) : 일반적 변수를 보관한다.
// [변하는 값] : 의존성(dependence) 배열 : 값변하면 함수실행
// 복잡한 연산을 통해서 만들어지는 결과가 있다면 useMemo 고려
const ran = useMemo(() => {
  return Math.random();
}, []);
```

## 7. useCallback를 이용한 함수 보관

```js
// useCallback(함수, [])
const onClickJS = useCallback(() => {
  countJS += 1;
  console.log("자바스크립트 변수 countJS", countJS);
}, []);
```

## 8. state 를 관리하는 함수는 정말 조심

- state 를 보관하고 있다.
- 값이 갱신안된다.

```js
const [countState, setCountState] = useState(0);
const onClickState = useCallback(() => {
  setCountState(countState + 1);
  console.log("======>State 변수 countState", countState);
}, []);
```

- useState 변수는 아래를 지켜주자.
- 해결법 1

```js
const onClickState = useCallback(() => {
  // setCountState(countState + 1);
  // 해결법 1.
  // setCountState( 현재상태값 => 현재상태값 + 1 );
  setCountState(prev => prev + 1);
  console.log("======>State 변수 countState", countState);
}, []);
```

- 해결법 2

```js
const onClickState = useCallback(() => {
  setCountState(countState + 1);
  console.log("======>State 변수 countState", countState);
}, [countState]);
```

## 9. 자식 컴포넌트를 리랜더링 최적화 적용하기

- React.memo(컴포넌트)
- src/pages/Child.js

```js
import React, { memo } from "react";

const Child = () => {
  console.log("========= 자식입니다.=======");
  return <div>Child</div>;
};

export default memo(Child);
```

- 참고사항
  : React.memo 를 이용하면 기본적으로 변화가 없으면 리랜더링 제외
  : 상위 컴포넌트로부터 props 가 전달되면 무조건 리랜더링 한다.

## 10. 각 항목별 적용 기준

- useMemo(함수, []) : 변수저장입니다. 활용하세요.
- useCallback(함수, []) : 함수저장입니다. 적극적 활용하세요.
- memo(컴포넌트) : 조금 고민하면서 활용하세요.
