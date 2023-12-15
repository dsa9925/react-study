# React

## 10. axios 와 json-server 설치하기

### 1. json-server

- [json-server](https://www.npmjs.com/package/json-server)
- [블로그 자료](https://poiemaweb.com/json-server)

#### 1.1. json-server 서버 구축하기

- /server 폴더 만들어준다. (리액트 아님, 서버연습용 폴더)
- /server 폴더로 이동하기 (터미널에 입력)
  : Change Directory 폴더명
  : `cd server`
- Node.js 프로젝트 생성
  : `npm init -y`
- jsonserver 설치하기
  : `npm install -g json-server`
- /server/db.json 파일생성하기

```json
{
  "posts": [{ "id": 1, "title": "json-server", "author": "typicode" }],
  "comments": [{ "id": 1, "body": "some comment", "postId": 1 }],
  "profile": { "name": "typicode" }
}
```

- package.json 설정

```josn
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "json-server --host 192.168.0.66 --watch db.json --port 5000"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

- 서버 실행하기
  : `npm start`

### 2. 리액트 axios 작업

- [axios](https://axios-http.com/kr/docs/intro)
- 설치하기
  : `npm install axios`
- api 폴더 구조
  : GET, DELETE, PUT, FETCH, POST 에 연결할 주소
  : 백엔드와 연동할 js 는 별도로 관리하기를 추천합니다.
  : /src/api 폴더를 만들기를 추천합니다.
  : /src/api/config.js 파일을 만들기를 추천합니다.

### 3. CORS 권한 설정 (주소가 다른 경우 테스트시 셋팅)

- 2 가지 중에 테스트 후 1가지를 선택해서 적용

#### 3.1. Proxy 미들웨어 설치(주소를 변환)[https://velog.io/@iberis/React-Proxy]

- 상황에 따라서 다르므로 그린 컴퓨터 프로젝트는 반영이 안된다.
- `npm install http-proxy-middleware`
- /src/setupProxy.js 파일 생성

```js
/* eslint-disable no-undef */
// setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", //proxy가 필요한 path prameter를 입력합니다.
    createProxyMiddleware({
      target: "http://localhost:5000", //타겟이 되는 api url를 입력합니다.
      changeOrigin: true, //대상 서버 구성에 따라 호스트 헤더가 변경되도록 설정하는 부분입니다.
    }),
  );
};
```

#### 3.2. package.json 에 추가한다.

- `"proxy": "http://192.168.0.166:8080"`
- 그린컴퓨터 프로젝트는 위를 적용한다.
- /src/setupProxy.js 는 제거한다.

### 3.3. Proxy 를 사용하므로 주소도 필요없다.

- api 를 호출하면 자동으로
- http://192.168.0.166:8080/api 가 만들어진다.
- 그린컴퓨터 프로젝트는 위를 적용한다.

```json
{
  "name": "react_1",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@ant-design/icons": "^5.2.6",
    "@babel/plugin-proposal-private-property-in-object": "^7.21.11",
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "antd": "^5.12.1",
    "axios": "^1.6.2",
    "dayjs": "^1.11.10",
    "http-proxy-middleware": "^2.0.6",
    "moment": "^2.29.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router": "^6.20.0",
    "react-router-dom": "^6.20.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "eslint": "^8.54.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-react": "^7.33.2",
    "sass": "^1.69.5"
  },
  "proxy": "http://192.168.0.166:8080"
}
```
