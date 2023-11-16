# React 공부하기

## 3. 컴포넌트 html의 이해

- 컴포넌트의 용도 1 은 html 을 출력한다.
- 컴포넌트의 용도 2 은 여러번 재사용.
- 컴포넌트의 용도 3 은 유지보수 편리.
- 컴포넌트는 관례상 파일로 생성.
- 컴포넌트는 반드시 파스칼케이스(대문자)로 파일 및 코드 생성.

### 1. 리액트 작업 (컴포넌트 작업 진행 순서)

#### 1.3. 데이터를 어디에 배치하면 효율적일까 고민해서 state 작성

- props.children 을 통해 컴포넌트 html 내용 변경

```js
// src/components/Header.js

const Header = (props) => {
  // 내부 html을 전달받아서 내용을 변경한다.
  const children = props.children;
  return (
    <header>
      <div>{children}</div>
    </header>
  );
};

export default Header;
```

- props 를 편하게 사용하는 법(객체 구조 분해 할당 : Destructuring assignment)

```js
// src/components/Header.js
const Header = ({ children }) => {
  // 내부 html을 전달받아서 내용을 변경한다.
  // const children = props.children;
  return (
    <header>
      <div>{children}</div>
    </header>
  );
};

export default Header;
```
