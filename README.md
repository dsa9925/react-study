# React 공부하기

## 3. 컴포넌트 html의 이해

- 컴포넌트의 용도 1 은 html 을 출력한다.
- 컴포넌트의 용도 2 은 여러번 재사용.
- 컴포넌트의 용도 3 은 유지보수 편리.
- 컴포넌트는 관례상 파일로 생성.
- 컴포넌트는 반드시 파스칼케이스(대문자)로 파일 및 코드 생성.

### 1. 리액트 작업 (컴포넌트 작업 진행 순서)

#### 1.2. 컴포넌트 구조에 대해서 생각

- 우선 각 내용영역 html (컴포넌트) 을 배치해서 화면(page) 를 모아둔 src/pages 폴더 가 있었으면 좋겠습니다.
- 각 내용영역 html(컴포넌트) 을 모아둘 src/components 폴더가 있었으면 좋겠습니다.
- src/pages 폴더 생성
- src/components 폴더 생성
- 폴더명은 무조건 소문자로 컨벤션하겠습니다.

- `src/pages/Main.js` 생성 후 App.js 코드를 이동해줌.
- 이렇게 한 이유는 화면의 하나의 단위이기 때문입니다.
- 사용자가 접속시에 보여지는 한 화면이기 때문에 pages 폴더에 생성

```js
// src/pages/Main.js
const Main = () => {
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
};

export default Main;
```

- src/Apps.js 는 Main 컴포넌트를 배치

```js
import Main from "./pages/Main";

function App() {
  // js 코드 자리
  return <Main></Main>;
}

export default App;
```

- 컴포넌트를 구성하는 작업을 진행함
- 상단영역 컴포넌트 생성 (src/components/Header.js)

```js
// src/components/Header.js
const Header = () => {
  return (
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
  );
};

export default Header;
```

```js
// src/pages/Main.js
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
};

export default Main;
```

- 하단 영역 컴포넌트 생성(src/components/Footer.js)

```js
const Footer = () => {
  return (
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
  );
};

export default Footer;
```

```js
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
      <Footer></Footer>
    </div>
  );
};

export default Main;
```

#### 1.3. 데이터를 어디에 배치하면 효율적일까 고민해서 state 작성
