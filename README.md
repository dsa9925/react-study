# React 공부하기

## 3. 컴포넌트 html의 이해

- 컴포넌트의 용도 1 은 html 을 출력한다.
- 컴포넌트의 용도 2 은 여러번 재사용.
- 컴포넌트의 용도 3 은 유지보수 편리.
- 컴포넌트는 관례상 파일로 생성.
- 컴포넌트는 반드시 파스칼케이스(대문자)로 파일 및 코드 생성.

### 2. 리액트 작업 (CSS 작업)

#### 2.2. 파일(리액트 전용) : link moudle.css 방식

- 모듈(파일)별 로컬 Scope css 적용하기
- css 덮어쒸우기가 아니므로 팀 프로젝트에 도입 가능
- 컴포넌트명.module.css
- Main.module.css

```js
// src/components/Header.js
import sytles from "../styles/Header.module.css";
const Header = ({ children }) => {
  // 내부 html을 전달받아서 내용을 변경한다.
  // const children = props.children;
  return (
    <header className={sytles.wrap}>
      <div>{children}</div>
    </header>
  );
};

export default Header;
```

src/styles/Header.module.css

```css
.wrap {
  position: relative;
  display: block;
  width: 50%;
  max-width: 1180px;
  margin: 0 auto;
  background: blue;
}
```

#### 2.3. 파일 : link .scss 방식

#### 2.4. js 형식 : inline {} 방식

#### 2.5. js 형식 : 변수 {} 방식

#### 2.6. CSS-in-JS 형식 : emotion.js 방식
