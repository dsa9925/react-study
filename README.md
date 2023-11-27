# React 공부하기

## 8. React Router

- Router(라우터) : URI 경로를 동기화하여 화면의 전환, 흐름을 제어한다.
- HTML 이동을 하지 않고 내용을 갱신합니다.
- `npm install react-router` 를 설치하고 활용합니다.
- `npm install react-router-dom`를 설치하고 활용합니다.

### 8.9. useSearchParams 를 통해 쿼리스트링( Query String ) 활용하기

- http://127.0.0.1:3000?no=1&msg=안녕&id=hong
- http://127.0.0.1:3000 는 URL
- ? 는 쿼리 구분자
- no=1&msg=안녕&id=hong 쿼리 스트링
- & 는 쿼리 항목 구분자
- 예) no=1 쿼리로서 no라는 변수에 값 1을 담아서 URL 로 전달

/src/App.js

```js
<Route path="/about" element={<About title="우리서비스소개" />}>
  {/* Outelet 컴포넌트 초기화면은 index 로 셋트 */}
  <Route index element={<Ceo />}></Route>
  <Route path="ceo" element={<Ceo />}></Route>
  <Route path="map" element={<Map />}></Route>
  <Route path="notice" element={<Notice />}></Route>
</Route>
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
        <br />
        <Link to="/about/map">회사위치</Link>
        <br />
        <Link to="/about/notice">공지사항</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default About;
```

/src/pages/Notice.js

```js
import React from "react";

const Notice = () => {
  return <div>Notice</div>;
};

export default Notice;
```

- useSearchParams 의 get 메서드를 이용해서 쿼리 출력하기

```js
import React from "react";
import { useSearchParams } from "react-router-dom";

const Notice = () => {
  // 쿼리 스트링 처리하기
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  // 쿼리 중에 page 를 알고싶다.
  const page = searchParams.get("page");
  console.log(page);
  // 쿼리 중에 user 를 알고 싶다.
  const user = searchParams.get("user");
  console.log(user);
  // 쿼리 중에 total 을 알고 싶다.
  const total = searchParams.get("total");
  console.log(total);
  return (
    <div>
      <h2>Notice</h2>
      <p>
        현재 페이지 {page} / 총페이지 {total}
      </p>
      <div>공지사항의 {user} 목록</div>
      <div>
        <button>이전페이지</button>
        <div>페이지번호 출력</div>
        <button>다음페이지</button>
      </div>
    </div>
  );
};

export default Notice;
```

- 이전/다음버튼 눌러서 페이지 값 변경

```js
import React from "react";
import { useSearchParams } from "react-router-dom";

const Notice = () => {
  // 쿼리 스트링 처리하기
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  // 쿼리 중에 page 를 알고싶다.
  let page = searchParams.get("page");
  page = parseInt(page);
  console.log(page);
  // 쿼리 중에 user 를 알고 싶다.
  const user = searchParams.get("user");
  console.log(user);
  // 쿼리 중에 total 을 알고 싶다.
  let total = searchParams.get("total");
  total = parseInt(total);

  console.log(total);

  const handleClickPrev = () => {
    console.log("이전목록");
    // 현재 page 에서 1 을 빼서 1보다 작으면 1
    // 그렇지 않으면 1을 뺀 값을 출력한다.

    // page = page - 1;
    // page -= 1;
    // page --;
    // if (page < 1) {
    //   page = 1;
    // }

    page = page < 1 ? 1 : page--;
    console.log(page);
  };
  const handleClickNext = () => {
    console.log("다음목록");
    // 만약에 현재 page 가 total 보다 작다면
    // page 에 1 증가한 결과를 반영한다.
    // if (page < total) {
    //   page = page + 1;
    // }
    // page += 1;
    // page = page + 1;
    // page ++;
    page = page < total ? ++page : total;
    console.log(page);
  };

  return (
    <div>
      <h2>Notice</h2>
      <p>
        현재 페이지 {page} / 총페이지 {total}
      </p>
      <div>공지사항의 {user} 목록</div>
      <div>
        <button
          onClick={() => {
            handleClickPrev();
          }}
        >
          이전페이지
        </button>
        <div>페이지번호 출력</div>
        <button
          onClick={() => {
            handleClickNext();
          }}
        >
          다음페이지
        </button>
      </div>
    </div>
  );
};

export default Notice;
```

8.10. useNavigate() 로 주소전달하여 이동하기

```js
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Notice = () => {
  // 주소창에 쿼리 전달하기 및 페이지이동하기
  const navigate = useNavigate();
  // 쿼리 스트링 처리하기
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  // 쿼리 중에 page 를 알고싶다.
  let page = searchParams.get("page");
  page = parseInt(page);
  console.log(page);
  // 쿼리 중에 user 를 알고 싶다.
  const user = searchParams.get("user");
  console.log(user);
  // 쿼리 중에 total 을 알고 싶다.
  let total = searchParams.get("total");
  total = parseInt(total);

  console.log(total);

  const handleClickPrev = () => {
    console.log("이전목록");
    // 현재 page 에서 1 을 빼서 1보다 작으면 1
    // 그렇지 않으면 1을 뺀 값을 출력한다.

    // page = page - 1;
    // page -= 1;
    // page --;
    // if (page < 1) {
    //   page = 1;
    // }

    // page = page <= 1 ? 1 : --page;
    page -= 1;
    if (page == 0) {
      page = 1;
    }

    console.log(page + "페이지 보여줘");
    // 샘플 코드
    navigate(`/about/notice?page=${page}&user=${user}&total=${total}`);
  };
  const handleClickNext = () => {
    console.log("다음목록");
    // 만약에 현재 page 가 total 보다 작다면
    // page 에 1 증가한 결과를 반영한다.
    // if (page < total) {
    //   page = page + 1;
    // }
    // page += 1;
    // page = page + 1;
    // page ++;
    page = page < total ? ++page : total;
    console.log(page);
    // 샘플 코드
    navigate(`/about/notice?page=${page}&user=${user}&total=${total}`);
  };

  return (
    <div>
      <h2>Notice</h2>
      <p>
        현재 페이지 {page} / 총페이지 {total}
      </p>
      <div>공지사항의 {user} 목록</div>
      <div>
        <button
          onClick={() => {
            handleClickPrev();
          }}
        >
          이전페이지
        </button>
        <div>페이지번호 출력</div>
        <button
          onClick={() => {
            handleClickNext();
          }}
        >
          다음페이지
        </button>
      </div>
    </div>
  );
};

export default Notice;
```

8.11. useLocation() 으로 주소 경로 정보 분석하기

```js
import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Notice = () => {
  // 주소창에 전달된 정보를 분석하기
  const location = useLocation();
  console.log(location);
  // 주소창에 쿼리 전달하기 및 페이지이동하기
  const navigate = useNavigate();
  // 쿼리 스트링 처리하기
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  // 쿼리 중에 page 를 알고싶다.
  let page = searchParams.get("page");
  page = parseInt(page);
  console.log(page);
  // 쿼리 중에 user 를 알고 싶다.
  const user = searchParams.get("user");
  console.log(user);
  // 쿼리 중에 total 을 알고 싶다.
  let total = searchParams.get("total");
  total = parseInt(total);

  console.log(total);

  const handleClickPrev = () => {
    console.log("이전목록");
    // 현재 page 에서 1 을 빼서 1보다 작으면 1
    // 그렇지 않으면 1을 뺀 값을 출력한다.

    // page = page - 1;
    // page -= 1;
    // page --;
    // if (page < 1) {
    //   page = 1;
    // }

    // page = page <= 1 ? 1 : --page;
    page -= 1;
    if (page == 0) {
      page = 1;
    }

    console.log(page + "페이지 보여줘");
    // 샘플 코드
    navigate(`${location.pathname}?page=${page}&user=${user}&total=${total}`);
  };
  const handleClickNext = () => {
    console.log("다음목록");
    // 만약에 현재 page 가 total 보다 작다면
    // page 에 1 증가한 결과를 반영한다.
    // if (page < total) {
    //   page = page + 1;
    // }
    // page += 1;
    // page = page + 1;
    // page ++;
    page = page < total ? ++page : total;
    console.log(page);
    // 샘플 코드
    navigate(`${location.pathname}?page=${page}&user=${user}&total=${total}`);
  };

  return (
    <div>
      <h2>Notice</h2>
      <p>
        현재 페이지 {page} / 총페이지 {total}
      </p>
      <div>공지사항의 {user} 목록</div>
      <div>
        <button
          onClick={() => {
            handleClickPrev();
          }}
        >
          이전페이지
        </button>
        <div>페이지번호 출력</div>
        <button
          onClick={() => {
            handleClickNext();
          }}
        >
          다음페이지
        </button>
      </div>
    </div>
  );
};

export default Notice;
```

8.12. NavLink 활성화된 Link 쉽게 css 적용하기
/src/components/Header.js

```js
import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Header</h1>
      <div style={{ background: "skyblue", textAlign: "center", fontSize: 20 }}>
        <Link to="/home">Home</Link>|<Link to="/members">Members</Link>|
        <Link to="/about">About</Link>|
        <a href="http://www.naver.com" target="_blank">
          네이버
        </a>
      </div>
    </div>
  );
};

export default Header;
```

- 적용 후

```js
import React from "react";
import { Link, NavLink } from "react-router-dom";
const Header = () => {
  const ActiveLink = {
    color: "red",
    fontWeight: "bold",
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Header</h1>
      <div style={{ background: "skyblue", textAlign: "center", fontSize: 20 }}>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "activeMenu" : "";
          }}
          to="/home"
        >
          Home
        </NavLink>
        |<NavLink
          className={({ isActive }) => {
            return isActive ? "activeMenu" : "";
          }}
          to="/member"
        >
          Member
        </NavLink>|<NavLink
          className={({ isActive }) => {
            return isActive ? "activeMenu" : "";
          }}
          to="/about"
        >
          About
        </NavLink>|<a href="http://www.naver.com" target="_blank">
          네이버
        </a>
      </div>
    </div>
  );
};

export default Header;
```
