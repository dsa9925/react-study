# React 공부하기

## 8. React Router

- Router(라우터) : URI 경로를 동기화하여 화면의 전환, 흐름을 제어한다.
- HTML 이동을 하지 않고 내용을 갱신합니다.
- 밑에 2개를 설치해야 합니다.
- `npm install react-router` 를 설치하고 활용합니다.
- `npm install react-router-dom`를 설치하고 활용합니다.

### 8.1 리액트 라우터의 구조

- Router 안쪽에 Routes 안쪽에 Route 로 구성한다.
- Router > Routes > Route 로 구성합니다.
- 여기서 Router는 2가지 종류가 있습니다.
- 그 중에 통상 BrowserRouter를 사용합니다.
- 결론적으로 BrowserRouter > Routes > Route 를 구성합니다.

### 8.2 BrowserRouter > Routes >Route 샘플

/src/App.js

```js
import React from "react";
import Header from "./components/Header";
import About from "./pages/About";
import Home from "./pages/Home";
import Member from "./pages/Member";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        {/* 항상 보여줄 컴포넌트는 Routes 밖에 */}
        <Header />

        <Routes>
          {/* path는 경로를 뜻함 */}

          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/member" element={<Member />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
```

### 8.3 Link를 이용한 페이지 전환

```js
import { Link } from "react-router-dom";
...
<Link to="path"> 글자/그림 </Link>

```

- 위 코드의 결과로 실행시 html 태그의 a 태그로 변환된다.

- 예제코드

/src/components/Header.js

```js
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Header</h1>
      <div style={{ background: "white", textAlign: "center", fontSize: 20 }}>
        <Link to="/home">Home </Link> | <Link to="/member">Member</Link> |{" "}
        <Link to="/about">About</Link>
        <Link to="http://www.naver.com" target="_blank" rel="noreferrer">
          네이버
        </Link>
      </div>
    </div>
  );
};

export default Header;
```

### 8.4. 라우팅 컴포넌트에 props 전달하기

/src/App.js

```js
<Route path="/about" element={<About title="우리서비스소개" />}></Route>
...
```

/src/pages/About.js

```js
import React from "react";

const About = ({ title }) => {
  return <div>About : {title}</div>;
};

export default About;
```

### 8.5. 라우팅 컴포넌트에 복잡한 state props 전달하기

/src/App.js

```js
import React, { useState } from "react";
import Header from "./components/Header";
import About from "./pages/About";
import Home from "./pages/Home";
import Member from "./pages/Member";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const initMemberdata = [
    { name: "송보경", level: 10, img: "a.jpg", part: "팀장: 프로젝트 구성" },
    {
      name: "김도현",
      level: 5,
      img: "a.jpg",
      part: "팀장: 프로젝트 참여 및 파이팅 담당 ",
    },
    {
      name: "김주영",
      level: 5,
      img: "a.jpg",
      part: "팀장: 프로젝트 참여 및 간식 담당",
    },
    {
      name: "정화섭",
      level: 0,
      img: "a.jpg",
      part: "팀장: 프로젝트 참여 및 잔소리 담당",
    },
  ];
  const [member, setMember] = useState(initMemberdata);
  return (
    <BrowserRouter>
      <div>
        {/* 항상 보여줄 컴포넌트는 Routes 밖에 */}
        <Header />

        <Routes>
          {/* path는 경로를 뜻함 */}
          <Route path="/home" element={<Home />}></Route>
          <Route
            path="/about"
            element={<About title="우리서비스소개" />}
          ></Route>
          <Route path="/member" element={<Member member={member} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
```

/src/pages/Member;

```js
import React from "react";

const Member = ({ member }) => {
  return (
    <div>
      <h2>Member</h2>
      <div>
        <ul>
          {member.map(function (item, index) {
            return (
              <li key={index}>
                {item.name} : {item.part}
                <img src={item.img} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Member;
```

/src/pages/Member.js 개선

```js
import React from "react";

const Member = ({ member }) => {
  const showList = member.map(function (item, index) {
    return (
      <li key={index}>
        {item.name} : {item.part}
        <image src={item.img} />
      </li>
    );
  });
  return (
    <div>
      <h2>Member</h2>
      <div>
        <ul>
          {member.map(function (item, index) {
            return (
              <li key={index}>
                {item.name} : {item.part}
                <img src={item.img} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Member;
```

### 8.6. userParam 으로 변하는 값 받기

/src/App.js

```js
...
<Route path="/member/:id"
            element={<MembersDetail member={member} />}
          ></Route>
...
```

/src/pages/MemberDetail.js

```js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MembersDetail = ({ member }) => {
  // 주소뒤에 기재된 내용을 알아내야 한다.
  // members/정화섭
  // 정화섭 만을 알아내야한다.
  //   const param = useParams();
  // console.log(param);
  const { id } = useParams();

  // 배열에서 요소를 찾으면 for 문 중지
  const findData = member.find(function (item) {
    return item.name === id;
  });
  //   const findData2 = member.find(item => {
  //     return item.name === id;
  //   });
  //   const findData3 = member.find(item => item.name === id);

  console.log(findData);

  return (
    <div>
      <h1>
        {id}님의 상세정보 {findData?.hi}
      </h1>
      <div>
        {findData.name} / {findData.level} / {findData.img} / {findData.part}
      </div>
    </div>
  );
};

export default MembersDetail;
```

### 8.7. nested 와 Outlet 활용하기

/src/App.js

```js
import React, { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Member from "./pages/Member";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MembersDetail from "./pages/MembersDetail";
import Ceo from "./pages/Ceo";
import Map from "./pages/Map";

const App = () => {
  const initMemberData = [
    { name: "송보경", level: 10, img: "a.jpg", part: "프로젝트 구성" },
    {
      name: "김도현",
      level: 5,
      img: "b.jpg",
      part: "프로젝트 참여 및 파이팅 담당",
    },
    {
      name: "김주영",
      level: 5,
      img: "c.png",
      part: "프로젝트 참여 및 간식 담당",
    },
    {
      name: "정화섭",
      level: 0,
      img: "d.gif",
      part: "프로젝트 구경 및 잔소리 담당",
    },
  ];
  const [member, setMember] = useState(initMemberData);

  return (
    <BrowserRouter>
      <div>
        {/* 항상 보여줄 컴포넌트는 Routes 에서 배제 */}
        <Header />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>

          {/* Nested 라우터 */}
          <Route path="/about" element={<About title="우리서비스소개" />}>
            {/* Outelet 컴포넌트 초기화면은 index 로 셋팅 */}
            <Route index element={<Ceo />}></Route>

            <Route path="ceo" element={<Ceo />}></Route>
            <Route path="map" element={<Map />}></Route>
          </Route>

          {/* Nested 활용하기 */}
          <Route path="/member" element={<Member member={member} />}>
            {/* Outlet 역할 */}
            <Route
              path=":id"
              element={<MembersDetail member={member} />}
            ></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
```

/src/pages/About.js

```js
import React from "react";
import { Link, Outlet } from "react-router-dom";

const About = ({ title }) => {
  return (
    <div>
      <h2>About : {title}</h2>
      <div>
        <Link to="/about/ceo">Ceo 인사말</Link>
        <Link to="/about/map">회사위치</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default About;
```

/src/pages/Member.js

```js
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Member = ({ member }) => {
  // 멤버 목록 JSX 만들기
  const showList = member.map(function (item, index) {
    return (
      <li key={index}>
        {item.name}
        <Link to={`/member/${item.name}`}>상세보기</Link>
      </li>
    );
  });

  return (
    <div>
      <h2>Member</h2>
      <div>
        <ul>{showList}</ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Member;
```

### 8.8. NotFound 페이지 적용하기

/src/App.js

```js
<Route path="*" element={<NotFound />}></Route>
```
