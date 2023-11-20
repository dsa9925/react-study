# React 공부하기

## 3. 컴포넌트 html의 이해

- 컴포넌트의 용도 1 은 html 을 출력한다.
- 컴포넌트의 용도 2 은 여러번 재사용.
- 컴포넌트의 용도 3 은 유지보수 편리.
- 컴포넌트는 관례상 파일로 생성.
- 컴포넌트는 반드시 파스칼케이스(대문자)로 파일 및 코드 생성.

### 2. 리액트 작업 (CSS 작업)

#### 2.4. js 형식 : inline {} 방식

```js
  <div
      className="wrap"
      style={{
        background: "yellowgreen",
        fontSize: "10px",
        width: "450px",
        margin: "0 auto",
      }}
    >
```

- 컴포넌트에 css 에 적용을 직접할 수는 없습니다.

#### 2.5. js 형식 : 변수 {} 방식

```js

const Main = () => {

  const WrapCss = {
    background: "yellowgreen",
    fontSize: "10px",
    width: "450px",
    margin: "0 auto",
  };

return (
  <div className="wrap" style={WrapCss}>...</div>
```

- css 오브젝트 외부 파일로 추출

```js
export const WrapCss = {
  background: "yellowgreen",
  fontSize: "10px",
  width: "450px",
  margin: "0 auto",
};
```

```js
import { WrapCss } from "../styles/sample";
.....
<div className="wrap" style={WrapCss}>
```

#### 2.6. CSS-in-JS 형식 : emotion.js 방식
