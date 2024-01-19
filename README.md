# 쿠키 활용하기

- 문제는 새로고침하면 모든 정보가 초기화가 됩니다.
- [react-cookie](https://www.npmjs.com/package/react-cookie)
- `npm i react-cookie`
- package.json 확인 필요

## 1. 쿠키를 관리할 파일 생성

- /src/util 폴더
- /src/util/cookieUtil.js
- 쿠키 내용은 글자라서 JSON.stringify 를 활용

```js
import { Cookies } from "react-cookie";
// 사용법은 정말 단순
const cookie = new Cookies();

// 외부에서 사용하기 위해서 export 한다.
// setCookie( 쿠키이름, 저장할 값, 유통기한 시간기본 - 1일)
// 로그인시 정보 저장
export const setCookie = (name, value, day = 1) => {
  // 날짜(유통기간)을 생성
  const expires = new Date();
  expires.setUTCDate(expires.getUTCDate() + day);
  return cookie.set(name, value, { path: "/", expires: expires });
};

// getCookie( 쿠키이름)
// 로그인된 정보 필요시
export const getCookie = name => {
  return cookie.get(name);
};

// removeCookie( 쿠키이름, 저장된 경로 기본값)
// 로그아웃시 정보 삭제
export const removeCookie = (name, path = "/") => {
  cookie.remove(name, { path });
};
```

## 2. 쿠키에 로그인 정보 생성 및 삭제

- /src/slices/loginSlice.js 에서 처리

```js
import { createSlice } from "@reduxjs/toolkit";

// API 서버 연동
// reducer (store 상태 변경) 를 호출할때 지금은 API 호출
import { loginPost } from "../api/memberApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { removeCookie, setCookie } from "../util/cookieUtil";

// export const 외부함수 = createAsyncThunk("이름", 리듀서함수);
export const loginPostAsync = createAsyncThunk(
  "loginPostAsync",
  async ({ loginParam, successFn, failFn, errorFn }) => {
    try {
      const res = await loginPost({ loginParam, successFn, failFn, errorFn });

      // 결과값을 리턴을 해야 action 에 값이 담기지...
      return res;
    } catch (error) {
      return error;
    }
  },
);

const initState = {
  email: "",
};
const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initState,

  // store 의 state 를 업데이트 하는 함수 모음
  reducers: {
    login: (state, action) => {
      console.log("login.....");
      return { email: action.payload.email };
    },
    // 로그아웃
    logout: (state, action) => {
      console.log("logout.....");
      removeCookie("member", "/");
      return { ...initState };
    },
  },
  // 외부 API 연동을 통해 store 의 state 를 업데이트 함수 모음
  extraReducers: bulder => {
    bulder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        // 외부 연동 성공
        // state : 기존 값(store 의 loginSate)
        // action : 받아온 값
        console.log("fulfilled");
        // console.log(action);
        const payload = action.payload;
        console.log("payload", payload);
        if (!payload.error) {
          // 이때 필요한 정보를 보관한다.
          // 쿠키는 문자열입니다. 객체를 JSON 문자로 변환
          setCookie("member", JSON.stringify(payload));
        }
        return payload;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        // 외부 연동 시도중..
        // state : 기존 값(store 의 loginSate)
        // action : 받아온 값
        console.log("pending");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        // 외부 연동 실패
        // state : 기존 값(store 의 loginSate)
        // action : 받아온 값
        console.log("rejected");
      });
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;

loginSlice.js;
```

## 3. 쿠키를 이용한 정보 유지

- 로그인 정보
- 액세스 토큰 정보
- 리프레쉬 토크 정보

### 3.1 로그인 정보

- /src/slices/loginSlice.js

```js
import { createSlice } from "@reduxjs/toolkit";

// API 서버 연동
// reducer (store 상태 변경) 를 호출할때 지금은 API 호출
import { loginPost } from "../api/memberApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

// export const 외부함수 = createAsyncThunk("이름", 리듀서함수);
export const loginPostAsync = createAsyncThunk(
  "loginPostAsync",
  async ({ loginParam, successFn, failFn, errorFn }) => {
    try {
      const res = await loginPost({ loginParam, successFn, failFn, errorFn });

      // 결과값을 리턴을 해야 action 에 값이 담기지...
      return res;
    } catch (error) {
      return error;
    }
  },
);

const initState = {
  email: "",
};

// 쿠키 정보 읽어와서 initState 변경하기
const loadMemberCookie = () => {
  const memberInfo = getCookie("member");
  return memberInfo;
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loadMemberCookie() || initState,

  // store 의 state 를 업데이트 하는 함수 모음
  reducers: {
    login: (state, action) => {
      console.log("login.....");
      return { email: action.payload.email };
    },
    // 로그아웃
    logout: (state, action) => {
      console.log("logout.....");
      removeCookie("member", "/");
      return { ...initState };
    },
  },
  // 외부 API 연동을 통해 store 의 state 를 업데이트 함수 모음
  extraReducers: bulder => {
    bulder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        // 외부 연동 성공
        // state : 기존 값(store 의 loginSate)
        // action : 받아온 값
        console.log("fulfilled");
        // console.log(action);
        const payload = action.payload;
        console.log("payload", payload);
        if (!payload.error) {
          // 이때 필요한 정보를 보관한다.
          // 쿠키는 문자열입니다. 객체를 JSON 문자로 변환
          setCookie("member", JSON.stringify(payload));
        }
        return payload;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        // 외부 연동 시도중..
        // state : 기존 값(store 의 loginSate)
        // action : 받아온 값
        console.log("pending");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        // 외부 연동 실패
        // state : 기존 값(store 의 loginSate)
        // action : 받아온 값
        console.log("rejected");
      });
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;

loginSlice.js;
```

## 4. RTK 훅 만들기

- /src/hooks/useCustomLogin.js

```js
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { loginPostAsync, logout } from "../slices/loginSlice";

const useCustomLogin = () => {
  // 패스 이동하기
  const navigate = useNavigate();

  // RTK 상태값 업데이트
  const dispatch = useDispatch();

  // RTK 상태값 읽기
  const loginState = useSelector(state => state.loginState);

  // 로그인 상태값 파악
  const isLogin = loginState.email ? true : false;

  // 로그인 기능
  const doLogin = async ({ loginParam, successFn, failFn, errorFn }) => {
    // 로그인 어느화면에서 실행이 될 소지가 높아요.
    // 로그인 상태 업데이트
    const action = await dispatch(
      loginPostAsync({ loginParam, successFn, failFn, errorFn }),
    );
    // 결과값
    return action.payload;
  };

  // 로그아웃 기능
  const doLogout = () => {
    dispatch(logout());
  };

  // 패스이동 기능
  const moveToPath = path => {
    // 패스로 이동 후에 replace:ture 를 적용시 뒤로 가기 화면
    // 이전 페이지 기록을 남기지 않는다.
    navigate({ pathname: path }, { replace: true });
  };

  // 로그인 페이동 기능
  const moveToLogin = () => {
    return <Navigate replace to="/member/login" />;
  };

  return { loginState, isLogin, doLogin, doLogout, moveToPath, moveToLogin };
};

export default useCustomLogin;
```

### 4.1 RTK 훅 사용하기

- /src/components/member/LoginComponent.js

```js
import React, { useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";

// 초기값
const initState = {
  email: "",
  pw: "",
};
const LoginComponents = () => {
  const [loginParam, setLoginParam] = useState(initState);
  const handleChange = e => {
    // e.target.name
    // e.target.value
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };

  // 커스터훅 사용하기
  const { doLogin, moveToPath } = useCustomLogin();

  // slice 값(state)을 읽을때        useSelector
  // slice 값(state)를 업데이트할때  useDispatch()
  // const dispatch = useDispatch();
  const handleClick = e => {
    // // loginSlice 의  state 업데이트
    // // dispatch(login(loginParam));
    // dispatch(loginPostAsync({ loginParam, successFn, failFn, errorFn }));

    // 아래 구문을 실행하고 나면 Promise 돌려 받아요
    doLogin({ loginParam, successFn, failFn, errorFn });
  };

  const successFn = result => {
    console.log("성공", result);
    moveToPath("/");
  };

  const failFn = result => {
    console.log("실패", result);
    alert("이메일 및 비밀번호 확인하세요.");
  };

  const errorFn = result => {
    console.log("서버 에러", result);
  };

  return (
    <div>
      <div>
        <div>이메일</div>
        <div>
          <input
            type="email"
            name="email"
            value={loginParam.email}
            onChange={e => handleChange(e)}
          />
        </div>
      </div>

      <div>
        <div>비밀번호</div>
        <div>
          <input
            type="password"
            name="pw"
            value={loginParam.pw}
            onChange={e => handleChange(e)}
          />
        </div>
      </div>

      <div>
        <button onClick={handleClick}>로그인</button>
      </div>
    </div>
  );
};

export default LoginComponents;
```

- /src/components/menus/BasicMenu.js

```js
import React from "react";
import { Link } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
const BasicMenu = () => {
  // 로그인 슬라이스에서 email 읽는다.
  // loginSlice 값을 읽으려고 접근하기
  // const loginState = useSelector(state => state.loginSlice);
  // console.log(loginState);
  const { isLogin } = useCustomLogin();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {/* 로그인 상태 체크 후 내용 출력 */}
        {isLogin ? (
          <>
            <li>
              <Link to="/todo/">Todo</Link>
            </li>
            <li>
              <Link to="/product/">Product</Link>
            </li>
          </>
        ) : null}
      </ul>

      {/* 로그인 / 로그아웃버튼  */}
      <div>
        {isLogin ? (
          <Link to="/member/logout">로그아웃</Link>
        ) : (
          <Link to="/member/login">로그인</Link>
        )}
      </div>
    </nav>
  );
};

export default BasicMenu;
```

- /src/pasges/members/LogoutPage.js

```js
import React from "react";
import useCustomLogin from "../../hooks/useCustomLogin";

const LogoutPage = () => {
  // const dispatch = useDispatch();
  const { moveToPath, doLogout } = useCustomLogin();
  const handleClick = () => {
    doLogout();
    moveToPath("/member/login");
  };

  return (
    <div>
      <h2>로그아웃하시겠습니까?</h2>
      <div>
        <button onClick={handleClick}>로그아웃</button>
      </div>
    </div>
  );
};

export default LogoutPage;
```

- /src/pages/member/AboutPage.js

```js
import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import useCustomLogin from "../hooks/useCustomLogin";

const AboutPage = () => {
  const { isLogin, moveToLogin } = useCustomLogin();
  if (!isLogin) {
    moveToLogin();
  }

  return (
    <BasicLayout>
      <h1>AboutPage</h1>
    </BasicLayout>
  );
};

export default AboutPage;
```
