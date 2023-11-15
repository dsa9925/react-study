# React 공부하기

## 2. 기본 파일 이해

### index.html

- `npm start`
- 리액트 결과물은 index.html 의 id = "root" 에 배치된다. (id="root" 변경하지 말자.)
- SPA (Single Page Application) 은 1장의 html 에서 여러 컨텐츠를 교체하면서 보여주는 결과물을 말한다.
- index.html 코드 정리

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>리액트 공부</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

### src/index.js 살펴보기

- index.html 에서 최초로 실행되는 js 파일

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //   <React.StrictMode>
  //     <App />
  //   </React.StrictMode>
  <div className="wrap">
    <h1>잘나오나요?</h1>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

- 일반적으로 render ( ) 사이에는 직접 html 태그를 배치하지는 않는다.
- 하지만, React 에서는 관례상 `컴포넌트로 html 태그를 만들어 배치`한다.
- 처음으로 볼수 있는 html 태그를 생성하는 컴포넌트는 App.js 이다.
- React html 인 `컴포넌트의 이름을 대문자로 반드시 시작`한다.
- React html 인 컴포넌트에 html 요소가 2개 이상이면 반드시 `<></>` 로 감싸준다.
- 기본적인 컴포넌트의 모양새는 다음과 같다.

```js
const 컴포넌트변수 = function () {
  return <>태그자리</>;
};
const 컴포넌트변수 = () => {
  return <>태그자리</>;
};
```

- 컴포넌트 샘플 코드

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const Heading = function () {
  return (
    <div>
      반가워요. <b>김도현</b> 컴포넌트로 HTML 만듦
    </div>
  );
};

const Heading02 = function () {
  return <h1>반가워요.</h1>;
};

const Heading03 = function () {
  return <h2>소제목입니다.</h2>;
};

const Heading04 = function () {
  return <header>상단이에요.</header>;
};

const Heading05 = function () {
  return (
    <>
      <p>1번 문장입니다.</p>
      <p>2번 문장입니다.</p>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Heading />
    <Heading02 />
    <Heading03 />
    <Heading04 />
    <Heading05 />
    <App />
  </React.StrictMode>
);
reportWebVitals();
```

- 컴포넌트는 관례적으로 파스칼케이스 컴포넌트.js 로 만든다.

```js
// src/Heading.js
const Heading = function () {
  return (
    <div>
      반가워요. <b>김도현</b> 컴포넌트로 HTML 만듦
    </div>
  );
};
export default Heading;
```

- 컴포넌트를 사용하는 곳에서는 import 를 활용한다.

```js
import Heading from "Heading";
```

- 전체 코드

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Heading } from "./Heading.js";

// const Heading = function () {
//   return (
//     <div>
//       반가워요. <b>김도현</b> 컴포넌트로 HTML 만듦
//     </div>
//   );
// };

const Heading02 = function () {
  return <h1>반가워요.</h1>;
};

const Heading03 = function () {
  return <h2>소제목입니다.</h2>;
};

const Heading04 = function () {
  return <header>상단이에요.</header>;
};

const Heading05 = function () {
  return (
    <>
      <p>1번 문장입니다.</p>
      <p>2번 문장입니다.</p>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Heading />
    <Heading02 />
    <Heading03 />
    <Heading04 />
    <Heading05 />
    <App />
  </React.StrictMode>
);
reportWebVitals();
```
