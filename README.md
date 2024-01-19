# JWT 인증

- JSON Web Token 의 줄임말
- Token 은 복잡한 문자열
- Access Token
  : 자료 요청(axios) 시 먼저 전달
  : 약속된 Access Token 이 없으면 거부 합니다.

- Refresh Token
  : Access Token 은 만료시간이 있어요. (30분 ~1시간)
  : Access Token 이 거부되면 Refresh Token 프론트 전달
  : 다시 Access Token 과 Referesh Token 재발근

- axios에서 intecepter 설정
  : API 백엔드 서버에 전달하기 전과 후에 미리 토큰 전달

## 1. intercepter 셋팅

- /src/util/jwtUtil.js
  : jwt 인증 전용 axios

```js
import axios from "axios";
// intercepter 전용 axios 생성
// 로그인 제외 및 일반적 api 요청등을 제외
// 인증이 필요한 경우에 활용하는 용도
const jwtAxios = axios.create();

// 요청(request) intercepter
// request 가 문제가 있든, 없든 실행될 내용 작성
const beforeReq = config => {
  console.log("요청전 전달 .... ", config);
  return config;
};

// fail Request 요청보내서 실패했을 때
const requestFail = err => {
  console.log("요청후 실패시 .... ", err);
  return Promise.reject(err);
};

// 응답(Response) 처리 코드
// Response 전처리
const beforeRes = async res => {
  console.log("Response 전처리 ....", res);
  return res;
};
// Response Fail 처리
const responseFail = err => {
  console.log("Response Fail Err", err);
  return Promise.reject(err);
};

// axios 인터셉터 적용
jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
```

## 2. todo 적용

- /src/todoApi.js

```js
import axios from "axios";
import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = "http://192.168.0.66:8080";
const prefix = `${API_SERVER_HOST}/api/todo`;

export const getOne = async tno => {
  try {
    const res = await jwtAxios.get(`${prefix}/${tno}`);
    const status = res.status.toString();
    const httpSt = status.charAt(0);
    if (httpSt === "2") {
      return res.data;
    } else {
      return "잘못된 정보를 전달함";
    }
  } catch (error) {
    console.log(error);
  }
};

// 목록당 페이지와 일정 개수를 가져오기
export const getList = async param => {
  try {
    // "http://192.168.0.66:8080/api/todo/list?page=3&size=10"
    // const res = await axios.get(`${prefix}/list?page=${page}&size=${size}`);

    const res = await jwtAxios.get(`${prefix}/list`, {
      params: { ...param },
    });

    console.log(res.data);
    // HTTP 상태 코드 파악하여 별도로 처리하기
    const status = res.status.toString();

    const httpSt = status.charAt(0);
    if (httpSt === "2") {
      // console.log("성공");
      return res.data;
    } else {
      console.log("에러");
      return status.error;
    }
  } catch (error) {
    // HTTP 500 류의 오류 (서버에러)
    console.log(error);
  }
};

// 할일 등록하기 (객체{}로 전달)
export const postAdd = async ({ todo, successFn, failFn, errFn }) => {
  try {
    const res = await jwtAxios.post(`${prefix}/`, { ...todo });
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("데이터 에러");
    }
  } catch (error) {
    errFn(error);
  }
};

// 수정하기
export const putOne = async ({ todo, successFn, failFn, errFn }) => {
  try {
    const { tno } = todo;
    const res = await jwtAxios.put(`${prefix}/${tno}`, { ...todo });
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("데이터 에러");
    }
  } catch (error) {
    errFn(error);
  }
};
// 삭제하기
export const deleteOne = async ({ tno, successFn, failFn, errFn }) => {
  try {
    const res = await jwtAxios.delete(`${prefix}/${tno}`);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("데이터 에러");
    }
  } catch (error) {
    errFn(error);
  }
};
```

## 3. product 적용

- /src/productApi.js

```js
import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";
import jwtAxios from "../util/jwtUtil";

// 제품 API
const host = `${API_SERVER_HOST}/api/products`;

// 파일 업로드 비동기 통신
export const postAdd = async ({ product, successFn, failFn, errorFn }) => {
  try {
    // 파일 업로드시 준비할 것이 있습니다.
    // 반드시 복수형으로 { headers } 작성 필요
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await jwtAxios.post(`${host}/`, product, header);

    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("전송 오류입니다.");
    }
  } catch (error) {
    errorFn("서버에러에요");
  }
};

// 제품 목록가져오기
export const getList = async ({ param, successFn, failFn, errorFn }) => {
  try {
    const res = await jwtAxios.get(`${host}/list`, { params: param });

    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("목록 호출 오류입니다.");
    }
  } catch (error) {
    errorFn("목록 호출 서버 에러에요");
  }
};

// 하나의 제품 정보 가져오기
export const getOne = async ({ pno, successFn, failFn, errorFn }) => {
  try {
    const res = await jwtAxios.get(`${host}/${pno}`);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("상세정보 호출 오류입니다.");
    }
  } catch (error) {
    errorFn("상세정보 호출 서버 에러에요");
  }
};

// 제품 수정하기
export const putOne = async ({ pno, product, successFn, failFn, errorFn }) => {
  try {
    // 여기서도 이미지가 추가될 수 있어요.
    // header 가 필요합니다.
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await jwtAxios.put(`${host}/${pno}`, product, header);

    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("상세정보 호출 오류입니다.");
    }
  } catch (error) {
    errorFn(error);
  }
};

// 상품 삭제
export const deleteOne = async ({ pno, successFn, failFn, errorFn }) => {
  try {
    // 여기서도 이미지가 추가될 수 있어요.
    // header 가 필요합니다.
    const res = await jwtAxios.delete(`${host}/${pno}`);

    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("제품삭제 호출 오류입니다.");
    }
  } catch (error) {
    errorFn(error);
  }
};
```

## 4. jwt Access Token 적용 및 업데이트

- /src/util/jwtUtil.js

```js
import axios from "axios";
import { getCookie } from "./cookieUtil";
// intercepter 전용 axios 생성
// 로그인 제외 및 일반적 api 요청등을 제외
// 인증이 필요한 경우에 활용하는 용도
const jwtAxios = axios.create();

// 요청(request) intercepter
// request 가 문제가 있든, 없든 실행될 내용 작성
const beforeReq = config => {
  console.log("1. 요청전 전달 .... ", config);
  console.log("2. 쿠키로 토큰가져오기");
  const memberInfo = getCookie("member");

  if (!memberInfo) {
    console.log("쿠키 정보 없네요.");
    // axios 요청을 중단합니다.
    return Promise.reject({ response: { data: { error: "Login 하세요." } } });
  }

  console.log("3. 쿠키에서 토큰 정보를 뜯는다");
  const { accessToken } = memberInfo;
  console.log("4. 액세스토큰 정보", accessToken);
  // 요청한 Request 에 headers 에 형식이 있어요.
  // jwt 액세스토큰을 붙일때 형식이 있어요.
  // config 는 요청한 axios 이고
  // 이곳에서는  요청한 axios 의 전처리를 합니다.
  // 이때 추가내용을 headers에 추가합니다.
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

// fail Request 요청보내서 실패했을 때
const requestFail = err => {
  console.log("요청후 실패시 .... ", err);
  return Promise.reject(err);
};

// 응답(Response) 처리 코드
// Response 전처리
const beforeRes = async res => {
  console.log("Response 전처리 ....", res);
  return res;
};
// Response Fail 처리
const responseFail = err => {
  console.log("Response Fail Err", err);
  return Promise.reject(err);
};

// axios 인터셉터 적용
jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
```

## 5. jwt Refresh Token 적용 및 업데이트

- Access Token 으로 요청해서 에러메시지 리턴시 무조건 Refresh Token 을 전달해서 시도한다.
- /src/util/jwtUtil.js
