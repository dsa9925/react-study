# React 공부하기

## 6. 총복습

### 6.1 컴포넌트 HTML 구성

### 6.2 컴포넌트 CSS 구성

```js
import React from "react";
import styled from "@emotion/styled";
// 타이틀 콤포넌트
const Title = props => {
  return <h1>{props.children}</h1>;
};
// 입력창 콤포넌트
const Input = () => {
  return <div>입력창</div>;
};
// 목록 콤포넌트
const List = () => {
  return <div>목록</div>;
};

const App = () => {
  const TodoApp = styled.div`
    position: relative;
    display: block;
    max-width: 760px;
    min-width: 480px;
    margin: 50px auto;
    background: skyblue;
    text-align: center;
  `;
  return (
    <TodoApp>
      <Title>오늘 할일 샘플</Title>
      <Input />
      <List />
    </TodoApp>
  );
};

export default App;
```

### 6.3 컴포넌트 state 구성

- 각 컴포넌트마다 리랜더링을 위한 state 가 적절한 배치가 되었는지를 고민합니다.

```js
import { useState } from "react";

// 입력창 콤포넌트
const Input = ({ showTodoTxt }) => {
  const [txt, setTxt] = useState("");
  const handleChangeTxt = e => {
    // console.log(e.target)
    setTxt(e.target.value);
  };
  const handleSubmit = e => {
    if (txt === "") {
      alert("내용을 입력하세요.");
      return;
    }

    alert("데이터를 추가하였습니다.");
    showTodoTxt(txt);

    setTxt("");
  };
  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          name="txt"
          value={txt}
          onChange={e => handleChangeTxt(e)}
        />
        <button>할일추가</button>
      </form>
    </div>
  );
};
export default Input;
```

```js
  const showTodoTxt = title => {
    alert(`전달받은 제목은 ${title} 입니다.`);
  };
  ....
  <Input showTodoTxt={showTodoTxt} />
      ...

```

### 6.4 컴포넌트 props 구성

```js
<Title today="수요일" myname="김도현" month={11} day={22}>
  오늘 할일 샘플
</Title>
```

```js
// 타이틀 콤포넌트
const Title = function (props) {
  console.log(props);
  return (
    <h1>
      {props.month}월{props.day}일 {props.myname} {props.today} {props.children}
    </h1>
  );
};
export default Title;
```

```js
import React from "react";
import styled from "@emotion/styled";
import Title from "./components/Title";
import Input from "./components/Input";
import List from "./components/List";

const App = () => {
  const TodoApp = styled.div`
    position: relative;
    display: block;
    max-width: 760px;
    min-width: 480px;
    margin: 50px auto;
    background: skyblue;
    text-align: center;
  `;

  const showMessage = () => {
    alert("안녕하세요. 퐛팅");
  };
  const sayHi = message => {
    alert(`당신의 인사는 ${message}이군요`);
  };
  return (
    <TodoApp>
      <Title
        today="수요일"
        myname="김도현"
        month={11}
        day={22}
        say={showMessage}
        gogo={sayHi}
      >
        오늘 할일 샘플
      </Title>
      <Input />
      <List />
    </TodoApp>
  );
};

export default App;
```

```js
// 타이틀 콤포넌트
const Title = function (props) {
  console.log(props);
  return (
    <h1 onClick={() => props.gogo("반갑지롱!!!")}>
      {props.month}월{props.day}일 {props.myname} {props.today} {props.children}
    </h1>
  );
};
export default Title;
```

```js
// 타이틀 콤포넌트
const Title = function ({ month, day, myname, gogo, say, today, children }) {
  //   console.log(props);
  return (
    <h1 onClick={() => gogo("반갑지롱!!!")}>
      {month}월{day}일 {myname} {today} {children}
    </h1>
  );
};
export default Title;
```

```js
import { useState } from "react";

// 목록 콤포넌트
const List = ({ data }) => {
  return (
    <div>
      <ul>
        {data.map(function (item, index) {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
};

export default List;
```

```js
import React, { useState } from "react";
import styled from "@emotion/styled";
import Title from "./components/Title";
import Input from "./components/Input";
import List from "./components/List";

const App = () => {
  const TodoApp = styled.div`
    position: relative;
    display: block;
    max-width: 760px;
    min-width: 480px;
    margin: 50px auto;
    background: skyblue;
    text-align: center;
  `;

  const showMessage = () => {
    alert("안녕하세요. 퐛팅");
  };
  const sayHi = message => {
    alert(`당신의 인사는 ${message}이군요`);
  };
  const showTodoTxt = title => {
    alert(`전달받은 제목은 ${title} 입니다.`);
    // 1. 목록 전체 배열을 복사하여서 새로운 배열을 만든다.
    const newData = [...data];
    newData.push(title); // 배열 요소 추가
    // 2. setData에 복사한 배열로 교체한다.
    setData(newData);
  };

  const [data, setData] = useState([]);

  return (
    <TodoApp>
      <Title
        today="수요일"
        myname="김도현"
        month={11}
        day={22}
        say={showMessage}
        gogo={sayHi}
      >
        오늘 할일 샘플
      </Title>
      <Input showTodoTxt={showTodoTxt} />
      <List data={data} />
    </TodoApp>
  );
};

export default App;
```

### 6.5 컴포넌트 event 구성

### 6.6 컴포넌트 출력 갱신 구성
