# React 공부하기

## 5. 컴포넌트 갱신(새로고침)의 이해

### 5.1. state 의 이해 : Re-Rendering

- 화면의 데이터를 출력한다는 것은 리랜더링 진행하는 것을 의미
- 직접 코드를 통해 리랜더링을 진행해야 한다.

```js
const App = () => {
  // 일반 변수
  let count = 0;
  const handleClickAdd = () => {
    count = count + 1;
    console.log(count);
    // 리랜더링: 화면 내용을 갱신
    const pTag = document.querySelector("p");
    pTag.innerHTML = "현재 : " + count;
  };
  const handleClickSub = () => {
    count = count - 1;
    console.log(count);
  };
  return (
    <div>
      <p>현재 : {count}</p>
      <button
        onClick={() => {
          handleClickAdd();
        }}
      >
        증가
      </button>
      <button
        onClick={() => {
          handleClickSub();
        }}
      >
        감소
      </button>
    </div>
  );
};

export default App;
```

```js
import { useState } from "react";

const App = () => {
  // 상태 변수 : 리랜더링이 돼요.
  // 상태 변수 문법
  // [getter, setter] = state(초기값)
  const [count, setCount] = useState(0);
  const handleClickAdd = () => {
    const now = count + 1;
    setCount(now);
  };
  const handleClickSub = () => {
    const now = count - 1;
    setCount(now);
  };
  return (
    <div>
      <p>현재 : {count}</p>
      <button
        onClick={() => {
          handleClickAdd();
        }}
      >
        증가
      </button>
      <button
        onClick={() => {
          handleClickSub();
        }}
      >
        감소
      </button>
    </div>
  );
};

export default App;
```

```js
import React from "react";
import { useState } from "react";

const App = () => {
  // 사용자 아이디 보관 및 리랜더링
  const [userId, setUserId] = useState("");

  // 사용자 패스워드 보관 및 리랜더링
  const [userPass, setUserPass] = useState("");

  // 데이터 전송
  const handleSubmit = e => {
    // 반드시 기본 동작을 막아준다.
    e.preventDefault();
    console.log(userId, userPass);
    if (userId === "") {
      alert("아이디를 입력하세요.");
      return;
    }
    if (userPass === "") {
      alert("패스워드를 입력하세요.");
      return;
    }
    alert("데이터가 등록되었습니다.");
    setUserId("");
    setUserPass("");
  };

  // 폼 입력 처리
  const handleChange = e => {
    // console.log(e.target);
    if (e.target.name === "user") {
      setUserId(e.target.value);
    }
    if (e.target.name === "pw") {
      setUserPass(e.target.value);
    }
  };
  return (
    <div>
      <form action="path" method="get" onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          name="user"
          value={userId}
          onChange={e => handleChange(e)}
        />
        <input
          type="password"
          name="pw"
          value={userPass}
          onChange={e => handleChange(e)}
        />
        <button type="submit">완료</button>
      </form>
    </div>
  );
};

export default App;
```
