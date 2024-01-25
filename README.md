# 카카오 로그인

- 정부 정책으로 이메일 수집 중지
- 카카오 애플리케이션 등록을 수정해야 합니다.
- 카카오 로그인을 백엔드에서 처리(협업)
- 카카로 로그인을 프론트에서 처리

## 1. 애플리케이션 설정

- Rest API 키 보관(본인 정보로 수정필요)
  : f6f075f2097bcc9ea1f1920bb63c450e

- Web 플랫폼 추가(도메인 또는 ip 정보로 추가 필요)
  : http://localhost:3000

- 카카오 로그인 사용 시 Redirect URI를 등록해야 합니다.

- Redirect URI(도메인 또는 ip 정보로 추가 필요)
  : http://localhost:3000/member/kakao

- 동의항목 결정
  : 닉네임 필수

- 카카오 로그인 > 활성화 설정

- [관련문서](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api)

## 2. API 만들기

- /src/api/kakaoApi.js

```js
// 앱 등록시 Rest 키 값(절대 오픈 금지)
const rest_api_key = "f6f075f2097bcc9ea1f1920bb63c450e";
// 카카오 로그인 통과시 이동할 주소
const redirect_uri = "http://localhost:3000/member/kakao";
// 카카오 로그인 문서 참조
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인시 활용
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};
```

## 3. 카카오로 연결해보기

- /src/components/member/LoginComponent.js

```js
import React, { useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getKakaoLoginLink } from "../../api/kakaoApi";
import { Link } from "react-router-dom";

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

  // 카카오 로그인
  const kakaoLogin = getKakaoLoginLink();

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

      <div>
        <Link to={kakaoLogin}>카카오로그인</Link>
      </div>
    </div>
  );
};

export default LoginComponents;
```

## 4. 연결이후 리다이렉트 패스 확인 해보기

- http://localhost:3000/member/kakao?code=XmKyIjBGOWjLuBl1M3z0Fpd1rDY1gwJGh8ESqgdsDv2l1_rjp4VqzQ2P56EKPXPsAAABjTktXQXMISgqRbFCUQ
- 액세스 코드 받아오기
- 리다이렉트 페이지 만들기
- /src/pages/members/KakaoRedirectPage.js

```js
import React from "react";
import { useSearchParams } from "react-router-dom";

const KakaoRedirectPage = () => {
  const [uRLSearchParams, setURLSearchParams] = useSearchParams();
  // 인증코드 파악하기
  const authCode = uRLSearchParams.get("code");
  return (
    <div>
      <h1>카카오 리다이렉트 페이지</h1>
      <div>{authCode}</div>
    </div>
  );
};

export default KakaoRedirectPage;
```

## 5. 라우터 만들기

- /src/App.js

```js
// KKO 로그인 후 보여줄 페이지
const LazyKaKaoPage = lazy(() => import("./pages/members/KakaoRedirectPage"));

// member 라우터 중첩 코드 안쪽

{
  /* ---Start 카카오로그인 연습 */
}
<Route
  path="kakao"
  element={
    <Suspense fallback={<Loading />}>
      <LazyKaKaoPage />
    </Suspense>
  }
/>;
{
  /* ---END 카카오로그인 연습 */
}
```

## 5. 카카오 Access Token 받기

- /src/api/kakaoApi.js

```js
import axios from "axios";

// 앱 등록시 Rest 키 값(절대 오픈 금지)
const rest_api_key = "f6f075f2097bcc9ea1f1920bb63c450e";
// 카카오 로그인 통과시 이동할 주소
const redirect_uri = "http://localhost:3000/member/kakao";
// 카카오 로그인 문서 참조
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인시 활용
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};
// access 토큰 받기 경로
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  const params = {
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  };

  const res = await axios.post(access_token_url, params, header);

  const accessToken = res.data.access_token;

  return accessToken;
};
```

- 1. 인가 코드를 받고 나면 Access Token 을 발급 요청해야 합니다.
- 2. 인가 코드를 이용해서 Access 토큰을 요청해 봅니다.
- /src/pages/members/KakaoRedirectPage.js

```js
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken } from "../../api/kakaoApi";

const KakaoRedirectPage = () => {
  const [uRLSearchParams, setURLSearchParams] = useSearchParams();
  // 인증코드 파악하기
  const authCode = uRLSearchParams.get("code");

  // 인증코드로 Access Token 요청하기
  useEffect(() => {
    getAccessToken(authCode).then(data => {
      console.log("access Token", data);
    });
  }, [authCode]);

  return (
    <div>
      <h1>카카오 리다이렉트 페이지</h1>
      <div>{authCode}</div>
    </div>
  );
};

export default KakaoRedirectPage;
```

## 6. 카카오 애플리케이션 비즈앱 등록하기

- 카카오 개발자 콘솔 > 애플리케이션 선택 > 비즈니스 > 앱 아이콘 등록 > 기본 정보 > 수정 > 아이콘 등록 > 저장
- 비즈니스 > 개인 개발자 비즈 앱 전환 > 이메일 필수 동의 > 전환
- 비즈니스 > 비즈 앱 정보 확인
- 요약정보 > Biz 탭 활성화 확인
- 카카오 로그인 > 동의항목 > 이메일 설정

## 7. API 서버에서 사용자 정보 추출하기

- 리액트 에서 카카오 로그인 호출
- 웹브라우저에서 카카오 인가 창으로 이동
- 인가 완료되면 리액트 리다이렉트 화면으로 이동
- 리다이렉트 화면에서 Access Token 요청
- 요청에 의한 결과가 리턴
- 다시 사용자의 상세 정보호출이 가능합니다.
- API 백엔드 에게 맡긴다.
- 위의 정보로 사용자 등록을 한다.
- /src/api/kakaoApi.js

```js
import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

// 앱 등록시 Rest 키 값(절대 오픈 금지)
const rest_api_key = "f6f075f2097bcc9ea1f1920bb63c450e";
// 카카오 로그인 통과시 이동할 주소
const redirect_uri = "http://localhost:3000/member/kakao";
// 카카오 로그인 문서 참조
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인시 활용
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};
// access 토큰 받기 경로
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  const params = {
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  };

  const res = await axios.post(access_token_url, params, header);

  const accessToken = res.data.access_token;

  return accessToken;
};

// Access Token 으로 회원정보 가져오기
export const getMemberWithAccessToken = async accessToken => {
  console.log("백엔드에 회원 등록을 위한 액세스 토큰 전달 ", accessToken);
  const res = await axios.get(
    `${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`,
  );

  return res.data;
};
```

## 8. API 서버에 액세스 토큰 전달해서 회원정보 등록 요청

- /src/pages/members/KakaoRedirectPage.js

```js
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";

const KakaoRedirectPage = () => {
  const [uRLSearchParams, setURLSearchParams] = useSearchParams();
  // 인증코드 파악하기
  const authCode = uRLSearchParams.get("code");

  // 인증코드로 Access Token 요청하기
  useEffect(() => {
    getAccessToken(authCode).then(accessToken => {
      console.log("access Token", accessToken);
      getMemberWithAccessToken(accessToken).then(memberInfo => {
        console.log("-------------------");
        console.log(memberInfo);
      });
    });
  }, [authCode]);

  return (
    <div>
      <h1>카카오 리다이렉트 페이지</h1>
      <div>{authCode}</div>
    </div>
  );
};

export default KakaoRedirectPage;
```

## 9. 로그인 이후 정보 수정 이동

```js
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const KakaoRedirectPage = () => {
  const [uRLSearchParams, setURLSearchParams] = useSearchParams();
  // 인증코드 파악하기
  const authCode = uRLSearchParams.get("code");

  // 로그인 과정을 위한 loginSlice 을 통해서 로그인시도
  const dispatch = useDispatch();
  const { moveToPath } = useCustomLogin();

  // 인증코드로 Access Token 요청하기
  useEffect(() => {
    getAccessToken(authCode).then(accessToken => {
      console.log("access Token", accessToken);
      // 개인 정보 호출
      getMemberWithAccessToken(accessToken).then(memberInfo => {
        console.log("-------------------");
        console.log(memberInfo);
        // API 백엔드 서버로 로그인을 시도합니다.

        dispatch(login(memberInfo));

        // 소셜회원이 아니라면
        if (memberInfo && !memberInfo.social) {
          // 첫페이지로 이동
          moveToPath("/");
        } else {
          // 정보 수정창으로 이동
          moveToPath("/member/modify");
        }
      });
    });
  }, [authCode]);

  return (
    <div>
      <h1>카카오 리다이렉트 페이지</h1>
      <div>{authCode}</div>
    </div>
  );
};

export default KakaoRedirectPage;
```

## 10. 사용자 정보 수정창 처리

- /src/pages/members/ModifyPage.js
- /src/App.js
  : 라우터 설정
  : 중첩라우터 설정

```js
const LazyModifyPage = lazy(() => import("./pages/members/ModifyPage"));

...
{/* ---Start 정보수정 연습 */}
<Route
  path="modify"
  element={
    <Suspense fallback={<Loading />}>
      <LazyModifyPage />
    </Suspense>
  }
/>
{/* ---END 정보수정 연습 */}

```

- /src/pages/members/ModifyPage.js

```js
import React from "react";
import ModifyComponent from "../../components/member/ModifyComponent";

const ModifyPage = () => {
  return (
    <div>
      <h1>정보수정</h1>
      <ModifyComponent />
    </div>
  );
};

export default ModifyPage;
```

- 참고사항
  : 카카오 개발자등록
  : 애플리케이션 생성(REST API 키 )
  : 비즈 앱 등록 (email 필수 항목)
  : 인가코드 요청 (회신) ===> access Token (요청)
  : 요청(access Token)처리 카카오 정보를 요청
  : 백엔드가 처리했어요. (회원정보를 DB 등록 ) 회신
  : 프론트에서 처리가능

  DB 에서 회신 -----> 우리가 필요한 정보 입력하도록 페이지 이동

- /src/slices/loginSlice.js
  : 카카오 인가 후 카카오 액세스 토큰을 API백엔드로 보낸 후
  : API 백엔드 에서 만든 토큰과 사용자 정보를
  : 쿠키에 구워준다.
  : 정상적으로 JWT 를 활용할 수 있다.

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
      // 문제가 발생합니다.
      // 쿠키에 정보를 구워주지 않았습니다.
      // 이때 필요한 정보를 보관한다.
      // 쿠키는 문자열입니다. 객체를 JSON 문자로 변환
      setCookie("member", JSON.stringify(action.payload));

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
```

- /src/components/member/ModifyComponent.js

```js
import React, { useEffect, useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";

// 초기값
const initState = {
  email: "",
  nickname: "",
  pw: "",
};
const ModifyComponent = () => {
  const [memberInfo, setMemberInfo] = useState(initState);
  // 사용자 정보가 쿠키에 저장 되었고, RTK 에도 보관
  const { loginState } = useCustomLogin();

  // 화면이 보이면 보관하고 있던 내용으로 초기값 출력
  useEffect(() => {
    setMemberInfo({ ...loginState, pw: "1111" });
  }, [loginState]);

  const handleChange = e => {
    // e.target.name  e.target.value
    memberInfo[e.target.name] = e.target.value;
    setMemberInfo({ ...memberInfo });
  };

  const handleSubmit = e => {
    // 웹브라우저 갱신막기
    e.prventDefault();
  };

  return (
    <div>
      <form>
        <div>
          <div>이메일</div>
          <div>
            <input
              type="email"
              name="email"
              readOnly
              value={memberInfo.email}
            />
          </div>
        </div>

        <div>
          <div>비밀번호</div>
          <div>
            <input
              type="password"
              value={memberInfo.pw}
              name="pw"
              onChange={e => handleChange(e)}
            />
          </div>
        </div>

        <div>
          <div>별칭</div>
          <div>
            <input
              type="text"
              value={memberInfo.nickname}
              name="nickname"
              onChange={e => handleChange(e)}
            />
          </div>
        </div>

        <div>
          <div>
            <button onClick={e => handleSubmit(e)}>수정</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModifyComponent;
```

## 11. 사용자 정보 API 추가

- /src/api/memberApi.js

```js
import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";
import jwtAxios from "../util/jwtUtil";
const host = `${API_SERVER_HOST}/api/member`;
// 로그인 하기 위한 정보보내기
// 결과 성공시 RTK 에 업데이트하기
// 일반적으로 post 로 전송합니다.
export const loginPost = async ({ loginParam, successFn, failFn, errorFn }) => {
  try {
    // 만약에 API 서버가 JSON 을 원한다면
    const header = { headers: { "Content-Type": "x-www-urlencoded" } };

    const formData = new FormData();
    // formData.append("이름", "값")
    formData.append("username", loginParam.email);
    formData.append("password", loginParam.pw);

    const res = await axios.post(`${host}/login`, formData, header);

    const status = res.status.toString();

    if (status.charAt(0) === "2") {
      // 화면 처리용
      successFn(res.data);

      // RTK 업데이트 하기위해서는 리턴을 해서 값을 전달해야 해
      return res.data;
    } else {
      failFn("로그인에 실패하였습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    errorFn("로그인에 실패하였습니다. 서버가 불안정합니다.다시 시도해주세요.");
  }
};

// 사용자 정보 수정 처리
export const modifyMember = async ({
  memberInfo,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    const res = await jwtAxios.put(`${host}/modify`, memberInfo);
    const status = res.status.toString();

    if (status.charAt(0) === "2") {
      // 화면 처리용
      successFn(res.data);
      // RTK 업데이트 하기위해서는 리턴을 해서 값을 전달해야 해
      return res.data;
    } else {
      failFn("정보수정에 실패하였습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    errorFn(
      "정보수정에 실패하였습니다. 서버가 불안정합니다.다시 시도해주세요.",
    );
  }
};
```

## 12. 모달창으로 마무리

- /src/components/members/ModifyComponent.js

```js
import React, { useEffect, useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import { modifyMember } from "../../api/memberApi";
import ResultModal from "../common/ResultModal";

// 초기값
const initState = {
  email: "",
  nickname: "",
  pw: "",
};
const ModifyComponent = () => {
  const [memberInfo, setMemberInfo] = useState(initState);
  // 사용자 정보가 쿠키에 저장 되었고, RTK 에도 보관
  const { loginState, moveToPath } = useCustomLogin();

  // 화면이 보이면 보관하고 있던 내용으로 초기값 출력
  useEffect(() => {
    setMemberInfo({ ...loginState, pw: "1111" });
  }, [loginState]);

  const handleChange = e => {
    // e.target.name  e.target.value
    memberInfo[e.target.name] = e.target.value;
    setMemberInfo({ ...memberInfo });
  };

  const handleSubmit = e => {
    // 웹브라우저 갱신막기
    e.preventDefault();
    modifyMember({ memberInfo, successFn, failFn, errorFn });
  };
  const successFn = result => {
    console.log(result);
    setPopContent("내용수정이 성공하였습니다.");
    setResult(0);
  };
  const failFn = result => {
    console.log(result);
    setPopContent(result);
    setResult(1);
  };
  const errorFn = result => {
    console.log(result);
    setPopContent(result);
    setResult(2);
  };

  const [popContent, setPopContent] = useState("");
  const [result, setResult] = useState(0);
  const closeModal = () => {
    if (result === 0) {
      // 정상처리(화면이동)
      moveToPath("/");
    } else {
      // 오류발생이므로 화면이동없이 창만닫기
      setPopContent("");
    }
  };

  return (
    <div>
      {popContent !== "" ? (
        <ResultModal
          title={"회원정보수정"}
          content={popContent}
          callFn={closeModal}
        />
      ) : null}

      <form>
        <div>
          <div>이메일</div>
          <div>
            <input
              type="email"
              name="email"
              readOnly
              value={memberInfo.email}
            />
          </div>
        </div>

        <div>
          <div>비밀번호</div>
          <div>
            <input
              type="password"
              value={memberInfo.pw}
              name="pw"
              onChange={e => handleChange(e)}
            />
          </div>
        </div>

        <div>
          <div>별칭</div>
          <div>
            <input
              type="text"
              value={memberInfo.nickname}
              name="nickname"
              onChange={e => handleChange(e)}
            />
          </div>
        </div>

        <div>
          <div>
            <button onClick={e => handleSubmit(e)}>수정</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModifyComponent;
```
