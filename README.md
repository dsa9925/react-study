# React 공부하기

## 3. 컴포넌트 html의 이해

- 컴포넌트의 용도 1 은 html 을 출력한다.
- 컴포넌트의 용도 2 은 여러번 재사용.
- 컴포넌트의 용도 3 은 유지보수 편리.
- 컴포넌트는 관례상 파일로 생성.
- 컴포넌트는 반드시 파스칼케이스(대문자)로 파일 및 코드 생성.

### 1. 리액트 작업 (컴포넌트 작업 진행 순서)

#### 1.3. 데이터를 어디에 배치하면 효율적일까 고민해서 state 작성

- 컴포넌트에 매개변수로 내용 html 전달하기

- Footer 내용 html 전달하기

```js
// src/componets/Footer.js
const Footer = (props) => {
  console.log(props.children);
  // js코드자리
  const tags = "안녕";
  return <footer>{props.children}</footer>;
};

export default Footer;
```

```js
// src/pages/Main.js
import Footer from "../components/Footer";
import Header from "../components/Header";

const Main = () => {
  return (
    <div>
      {/* 상단 내용 고정 */}
      <Header></Header>
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
      <Footer>
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
      </Footer>
    </div>
  );
};

export default Main;
```

-Header 내용 html 전달하기

```js
// src/components/Header.js
const Header = (props) => {
  return (
    <header>
      <div>{props.children}</div>
    </header>
  );
};
export default Header;
```

```js
// src/pages/Main.js
import Footer from "../components/Footer";
import Header from "../components/Header";

const Main = () => {
  return (
    <div>
      {/* 상단 내용 고정 */}
      <Header>
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
      </Header>
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
      <Footer>
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
      </Footer>
    </div>
  );
};

export default Main;
```
