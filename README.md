# React 공부하기

## 3. 컴포넌트 html의 이해

- 컴포넌트의 용도 1 은 html 을 출력한다.
- 컴포넌트의 용도 2 은 여러번 재사용.
- 컴포넌트의 용도 3 은 유지보수 편리.
- 컴포넌트는 관례상 파일로 생성.
- 컴포넌트는 반드시 파스칼케이스(대문자)로 파일 및 코드 생성.

### 1. 리액트 작업 (컴포넌트 작업 진행 순서)

#### 1.1. 먼저 컴포넌트 구조에 대해서 생각하지 마세요.

- 와이어프레임 및 Figma 를 참조해서 그냥~~ App.js 에 html 작성한다.

```js
// src/index.js (첫 실행 파일 : root 아이디에 내용 출력하라)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```js
// src/App.js
function App() {
  // js 코드 자리
  return (
    <div className="wrap">
      <header>상단</header>
      <div>이미지슬라이드</div>
      <div>커뮤니티</div>
      <footer>하단</footer>
    </div>
  );
}

export default App;
```

- 가상의 요구명세서를 고려해서 진행한 코드

```js
// src/App.js
function App() {
  // js 코드 자리
  return (
    <div>
      {/* 상단 내용 고정 */}
      <header>
        <div>
          <a href="#">로고</a>
          <nav>메뉴</nav>
        </div>
      </header>
      {/* 내용은 자주 변함 */}
      <main>
        <section>
          <div>이미지슬라이드</div>
        </section>
        <section>
          <div>커뮤니티</div>
        </section>
      </main>
      {/* 하단 고정 */}
      <footer>하단</footer>
    </div>
  );
}

export default App;
```

- 요구명세서에 작성된 내용 진행 완료

```js
function App() {
  // js 코드 자리
  return (
    <div>
      {/* 상단 내용 고정 */}
      <header>
        <div>
          <a href="#">로고</a>
          <nav>
            <ul>
              <li>
                <a href="#">Menu-1</a>
                <ul>
                  <li>
                    <a href="#">SubMenu-1</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-2</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-3</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-4</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Menu-2</a>
                <ul>
                  <li>
                    <a href="#">SubMenu-1</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-2</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-3</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-4</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Menu-3</a>
                <ul>
                  <li>
                    <a href="#">SubMenu-1</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-2</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-3</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-4</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Menu-4</a>
                <ul>
                  <li>
                    <a href="#">SubMenu-1</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-2</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-3</a>
                  </li>
                  <li>
                    <a href="#">SubMenu-4</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {/* 내용은 자주 변함 */}
      <main>
        <section>
          <div>이미지슬라이드</div>
        </section>
        <section>
          <div>
            <div>
              <div>공지사항</div>
              <div>갤러리</div>
            </div>
            <div>배너</div>
            <div>바로가기</div>
          </div>
        </section>
      </main>
      {/* 하단 고정 */}
      <footer>
        <div>
          <a href="#">로고</a>
        </div>
        <div>카피라이터</div>
        <div>
          <ul>
            <li>
              <a href="#">인스타그램</a>
            </li>
            <li>
              <a href="#">페이스북</a>
            </li>
            <li>
              <a href="#">카카오오픈채팅</a>
            </li>
            <li>
              <a href="#">네이버블러그</a>
            </li>
            <li>
              <a href="#">트위터(X)</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
```

#### 1.2. 컴포넌트 구조에 대해서 생각

- 우선 각 내용영역 html (컴포넌트) 을 배치해서 화면(page)를 모아둔 src/pages 폴더가 있었으면 좋겠습니다.
- 각 내용영역 html(컴포넌트)을 모아둘 src/components 폴더가 있었으면 좋겠습니다.
- src/pages 폴더 생성
- src/components 폴더 생성
- 폴더명은 무조건 소문자로 컨벤션하겠습니다.

#### 1.3. 데이터를 어디에 배치하면 효율적일까 고민해서 state 작성
