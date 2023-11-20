# React 공부하기

## 4. 컴포넌트 js의 이해

### 4.3. 반복문의 이해

```js
import React from "react";

const App = () => {
  // 주로 react 에서는 배열리스트
  const todoList = ["a", "b", "c", "d"];
  function showList() {
    // console.log(todoList);

    for (let i = 0; i < todoList.length; i++) {
      const item = todoList[i];
      console.log("for 문 :", item);
    }

    const 결과 = todoList.forEach(function (value, index, arr) {
      console.log("forEach 문 ", value, index, arr);
      return value;
    });
    console.log("결과", 결과);

    const 마무리 = todoList.map(function (value, index, arr) {
      console.log("map 문 ", value, index, arr);
      return <li key={index}>{value}</li>;
    });
    console.log("마무리", 마무리);
    return 마무리;
  }
  return (
    <div>
      <p>오늘 할일 </p>
      <ul>{showList()}</ul>
    </div>
  );
};

export default App;
```

```js
import React from "react";

const App = () => {
  const todoData = [
    {
      id: 1,
      title: "타이틀 A",
      writer: "홍길동",
      date: "2023-11-20",
      complted: true,
    },

    {
      id: 2,
      title: "타이틀 B",
      writer: "고길동",
      date: "2023-11-19",
      complted: false,
    },
    {
      id: 3,
      title: "타이틀 C",
      writer: "박길동",
      date: "2023-11-18",
      complted: true,
    },
    {
      id: 4,
      title: "타이틀 D",
      writer: "홍길동",
      date: "2023-11-20",
      complted: false,
    },
    {
      id: 5,
      title: "타이틀 E",
      writer: "홍길동",
      date: "2023-11-21",
      complted: true,
    },
  ];

  return (
    <div>
      <ul>
        <li>
          <input
            type="checkbox"
            checked={todoData[0].complted ? "checked" : ""}
          />
          <span>타이틀 : {todoData[0].title}</span>
          <span>작성자 : {todoData[0].writer}</span>
          <span>날짜: {todoData[0].date}</span>
        </li>
        <li>
          <input
            type="checkbox"
            checked={todoData[1].complted ? "checked" : ""}
          />
          <span>타이틀 : {todoData[1].title}</span>
          <span>작성자 : {todoData[1].writer}</span>
          <span>날짜: {todoData[1].date}</span>
        </li>
        <li>
          <input
            type="checkbox"
            checked={todoData[2].complted ? "checked" : ""}
          />
          <span>타이틀 : {todoData[2].title}</span>
          <span>작성자 : {todoData[2].writer}</span>
          <span>날짜: {todoData[2].date}</span>
        </li>
        <li>
          <input
            type="checkbox"
            checked={todoData[3].complted ? "checked" : ""}
          />
          <span>타이틀 : {todoData[3].title}</span>
          <span>작성자 : {todoData[3].writer}</span>
          <span>날짜: {todoData[3].date}</span>
        </li>
        <li>
          <input
            type="checkbox"
            checked={todoData[4].complted ? "checked" : ""}
          />
          <span>타이틀 : {todoData[4].title}</span>
          <span>작성자 : {todoData[4].writer}</span>
          <span>날짜: {todoData[4].date}</span>
        </li>
      </ul>
    </div>
  );
};

export default App;
```

```js
import React from "react";

const App = () => {
  const todoData = [
    {
      id: 1,
      title: "타이틀 A",
      writer: "홍길동",
      date: "2023-11-20",
      complted: true,
    },

    {
      id: 2,
      title: "타이틀 B",
      writer: "고길동",
      date: "2023-11-19",
      complted: false,
    },
    {
      id: 3,
      title: "타이틀 C",
      writer: "박길동",
      date: "2023-11-18",
      complted: true,
    },
    {
      id: 4,
      title: "타이틀 D",
      writer: "홍길동",
      date: "2023-11-20",
      complted: false,
    },
    {
      id: 5,
      title: "타이틀 E",
      writer: "홍길동",
      date: "2023-11-21",
      complted: true,
    },
  ];

  return (
    <div>
      <ul>
        {todoData.map(function (item, index) {
          // console.log(item);
          return (
            <li key={index}>
              <input type="checkbox" checked={item.complted ? "checked" : ""} />
              <span>타이틀 : {item.title}</span>
              <span>작성자 : {item.writer}</span>
              <span>날짜 : {item.date}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
```

```js
import styled from "@emotion/styled";
import React from "react";

const App = () => {
  const todoData = [
    {
      id: 1,
      title: "타이틀 A",
      writer: "홍길동",
      date: "2023-11-20",
      complted: true,
    },

    {
      id: 2,
      title: "타이틀 B",
      writer: "고길동",
      date: "2023-11-19",
      complted: false,
    },
    {
      id: 3,
      title: "타이틀 C",
      writer: "박길동",
      date: "2023-11-18",
      complted: true,
    },
    {
      id: 4,
      title: "타이틀 D",
      writer: "홍길동",
      date: "2023-11-20",
      complted: false,
    },
    {
      id: 5,
      title: "타이틀 E",
      writer: "홍길동",
      date: "2023-11-21",
      complted: true,
    },
  ];

  const TodoListWrap = styled.ul`
    position: relative;
    display: block;
    max-width: 960px;
    min-width: 480px;
    margin: 0 auto;
    background: skyblue;
  `;
  const TodoListItem = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    transition: all 0.5s;
    &:hover {
      background: rgba(255, 255, 255, 0.7);
      transform: scale(1.2);
    }
    &:active {
      background: red;
    }
  `;

  return (
    <div>
      <TodoListWrap>
        {todoData.map(function (item, index) {
          // console.log(item);
          return (
            <TodoListItem key={index}>
              <input type="checkbox" checked={item.complted ? "checked" : ""} />
              <span>타이틀 : {item.title}</span>
              <span>작성자 : {item.writer}</span>
              <span>날짜 : {item.date}</span>
            </TodoListItem>
          );
        })}
      </TodoListWrap>
    </div>
  );
};

export default App;
```

```js
import React from "react";

const App = () => {
  const feelData = [
    { icon: "1.svg", txt: "rad", color: "green" },
    { icon: "2.svg", txt: "good", color: "red" },
    { icon: "3.svg", txt: "meh", color: "blue" },
    { icon: "1.svg", txt: "bad", color: "hotpink" },
    { icon: "2.svg", txt: "awful", color: "gold" },
  ];

  const FeelCate = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  };
  const FeelIcon = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    "text-transform": "uppercase",
  };
  return (
    <div>
      <h1>How Are You?</h1>
      <div>Calendar Print</div>
      <div>
        <ul style={FeelCate}>
          {feelData.map(function (item, index) {
            console.log(item);
            return (
              <li key={index} style={FeelIcon}>
                <img src={`images/${item.icon}`} />
                <span style={{ color: item.color }}>{item.txt}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
```

### 4.4. 이벤트(onClick, onChange)의 이해
