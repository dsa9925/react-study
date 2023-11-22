# React 공부하기

## 7. 자료 임시 저장 및 임시 불러오기

### 7.1 컴포넌트 재구성

```js
import styled from "@emotion/styled";
import React from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import List from "./components/List";
import Footer from "./components/Footer";

const App = () => {
  const Layout = styled.div`
    position: relative;
    display: block;
    max-width: 960px;
    min-width: 480px;
    border-radius: 10px;
    background: skyblue;
    text-align: center;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
  `;
  return (
    <Layout>
      <Header version="1.0">
        <b>Todo App</b>
      </Header>
      <Input>입력창</Input>
      <List>목록</List>
      <Footer>하단</Footer>
    </Layout>
  );
};

export default App;
```

```js
import React from "react";

const Header = ({ children, version }) => {
  return (
    <header>
      {children} ({version})
    </header>
  );
};

export default Header;
```

```js
import React, { useState } from "react";

const Input = () => {
  // 화면 리랜더링을 위한 state 즉, 상태변경을 관리한다.
  const [title, setTitle] = useState("");
  const handleChange = e => {
    setTitle(e.target.value);
  };
  const handleClick = e => {
    // 반드시.. 절대로 잊지말자.
    // 기본 기능 막기
    e.preventDefault();
    if (title === "") {
      alert("제목을 입력하세요.");
      return;
    }
    alert("제목을 등록하였습니다.");
    setTitle("");
  };
  return (
    <form>
      <label htmlFor="title">제목</label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={e => handleChange(e)}
      />
      <button type="submit" onClick={e => handleClick(e)}>
        입력
      </button>
    </form>
  );
};

export default Input;
```

```js
import React, { useState } from "react";

const Input = ({ getTitle }) => {
  // 화면 리랜더링을 위한 state 즉, 상태변경을 관리한다.
  const [title, setTitle] = useState("");
  const handleChange = e => {
    setTitle(e.target.value);
  };
  const handleClick = e => {
    // 반드시.. 절대로 잊지말자.
    // 기본 기능 막기
    e.preventDefault();
    if (title === "") {
      alert("제목을 입력하세요.");
      return;
    }
    getTitle(title);
    alert("제목을 등록하였습니다.");
    setTitle("");
  };
  return (
    <form>
      <label htmlFor="title">제목</label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={e => handleChange(e)}
      />
      <button type="submit" onClick={e => handleClick(e)}>
        입력
      </button>
    </form>
  );
};

export default Input;
```

```js
import styled from "@emotion/styled";
import React from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import List from "./components/List";
import Footer from "./components/Footer";

const App = () => {
  const Layout = styled.div`
    position: relative;
    display: block;
    max-width: 960px;
    min-width: 480px;
    border-radius: 10px;
    background: skyblue;
    text-align: center;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
  `;
  // Input으로 부터 글자를 전달 받는 함수
  const getTitle = title => {
    console.log(title);
  };
  return (
    <Layout>
      <Header version="1.0">
        <b>Todo App</b>
      </Header>
      <Input getTitle={getTitle} />
      <List>목록</List>
      <Footer />
    </Layout>
  );
};

export default App;
```

```js
import React from "react";

const List = ({ datas }) => {
  return (
    <ul>
      {/* {배열.map(function(요소,순번){
        return (JSX)
    })} */}

      {datas.map(function (item, index) {
        return <li key={index}>{item}</li>;
      })}
    </ul>
  );
};

export default List;
```

```js
import styled from "@emotion/styled";
import React, { useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import List from "./components/List";
import Footer from "./components/Footer";

const App = () => {
  const Layout = styled.div`
    position: relative;
    display: block;
    max-width: 960px;
    min-width: 480px;
    border-radius: 10px;
    background: skyblue;
    text-align: center;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
  `;
  // Input으로 부터 글자를 전달 받는 함수
  const getTitle = title => {
    console.log(title);
    // 배열 뜯어서 복사하기 (Spread)
    const newDatas = [...datas];
    // 새로운 요소 추가하기
    newDatas.push(title);
    // state 업데이트 하기
    setDatas(newDatas);
  };
  const [datas, setDatas] = useState([]);
  return (
    <Layout>
      <Header version="1.0">
        <b>Todo App</b>
      </Header>
      <Input getTitle={getTitle} />
      <List datas={datas}>목록</List>
      <Footer>하단</Footer>
    </Layout>
  );
};

export default App;
```

### 7.2 자료 임시 저장

### 7.3 자료 임시 불러오기
