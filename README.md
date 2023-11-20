# React 공부하기

## 4. 컴포넌트 js의 이해

### 4.2. 조건문의 이해

- if 문 활용 단지, jsx 에 사용못함

```js
const App = () => {
  const flag = true;
  function show() {
    if (flag) {
      return "참이군요";
    } else {
      return "거짓이군요.";
    }
  }
  return <div>{show()}</div>;
};

export default App;
```

- html 출력

```js
const App = () => {
  const flag = true;

  function show() {
    if (flag) {
      return <p>참이군요</p>;
    } else {
      return <p>거짓이군요.</p>;
    }
  }

  return <div>{show()}</div>;
};

export default App;
```

```js
const App = () => {
  const flag = true;
  function show() {
    if (flag) {
      return (
        <p>
          <b>참이군요</b>
        </p>
      );
    } else {
      return (
        <p>
          <b>거짓이군요.</b>
        </p>
      );
    }
  }

  return <div>{show()}</div>;
};

export default App;
```

```js
const App = () => {
  const flag = true;
  const show = () => {
    if (flag) {
      return (
        <p>
          <b>참이군요</b>
        </p>
      );
    } else {
      return (
        <p>
          <b>거짓이군요.</b>
        </p>
      );
    }
  };

  return <div>{show()}</div>;
};

export default App;
```

- if 문 말고 3항( 조건 ? 참 : 거짓 ) 연산 랜더링

```js
const App = () => {
  const flag = true;
  return <div>{"안녕하세요."}</div>;
};

export default App;
```

```js
const App = () => {
  const flag = true;
  return <div>{flag ? "참이군요" : "거짓이군요"}</div>;
};

export default App;
```

```js
const App = () => {
  const flag = true;
  return <div>{flag ? <p>참이군요</p> : <p>거짓이군요</p>}</div>;
};

export default App;
```

```js
const App = () => {
  const flag = true;
  return (
    <div>
      {flag ? (
        <p>
          <b>참이군요</b>
        </p>
      ) : (
        <p>
          <b>거짓이군요</b>
        </p>
      )}
    </div>
  );
};

export default App;
```

```js
const App = () => {
  const flag = false;

  const DivStyle = {
    color: flag ? "red" : "blue",
    fontWeight: flag ? "bold" : "normal",
  };

  return (
    <div style={DivStyle}>
      {flag ? (
        <p>
          <b>참이군요</b>
        </p>
      ) : (
        <p>
          <b>거짓이군요</b>
        </p>
      )}
    </div>
  );
};

export default App;
```

```js
const App = () => {
  const flag = false;
  return (
    <div
      style={{
        color: flag ? "red" : "blue",
        fontWeight: flag ? "bold" : "normal",
      }}
    >
      {flag ? (
        <p>
          <b>참이군요</b>
        </p>
      ) : (
        <p>
          <b>거짓이군요</b>
        </p>
      )}
    </div>
  );
};

export default App;
```

```js
const App = () => {
  const flag = false;
  return (
    <div className={flag ? "wrap" : "box"}>
      {flag ? (
        <p>
          <b>참이군요</b>
        </p>
      ) : (
        <p>
          <b>거짓이군요</b>
        </p>
      )}
    </div>
  );
};

export default App;
```

```js
const App = () => {
  const flag = true;
  let classType = "wrap";
  return (
    <div className={flag ? classType + " mb5" : classType}>
      {flag ? (
        <p>
          <b>참이군요</b>
        </p>
      ) : (
        <p>
          <b>거짓이군요</b>
        </p>
      )}
    </div>
  );
};

export default App;
```

```js
const App = props => {
  const flag = true;
  let classType = "wrap";
  return (
    <div className={props.go ? classType + " mb5" : classType}>
      {flag ? (
        <p>
          <b>참이군요</b>
        </p>
      ) : (
        <p>
          <b>거짓이군요</b>
        </p>
      )}
    </div>
  );
};

export default App;
```

- if 문 말고 조건부 연산자 ( && || )

```js
const App = () => {
  const flag = true;
  return <div>{"안녕하세요."}</div>;
};

export default App;
```

```js
const App = () => {
  const flag = true;
  return <div>{flag && "참이군요"}</div>;
};

export default App;
```

```js
const App = () => {
  const flag = false;
  return <div>{flag || "거짓이군요"}</div>;
};

export default App;
```

- if 문 말고 옵셔널체이닝( 객체 ?. 속성 ) 연산자

```js
const App = () => {
  const flag = false;
  const person = {
    name: "홍길동",
    age: 16,
  };
  return (
    <div>
      <p>이름 : {person?.name || "이름이 없군요."}</p>
      <p>나이 : {person?.age || "나이가 없군요"}</p>
      <p>직업 : {person?.job || "직업이 없군요."}</p>
    </div>
  );
};

export default App;
```

### 4.3. 반복문의 이해

### 4.4. 이벤트(onClick, onChange)의 이해
