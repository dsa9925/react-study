# React 공부하기

## 4. 컴포넌트 js의 이해

#### 4.1. js 출력하기 : 글자, 숫자(결과값이 있으면 출력)

```js
function App() {
  // const a = 1;
  // return <>{a}</>;

  // const b = "안녕";
  // return <>{b}</>;

  // const a = 1;
  // const b = 2;
  // return <>{a + b}</>;

  // 화면 출력 결과물이 없을 시 미 출력
  // const a = true;
  // return <>{a}</>;

  // 화면 출력 결과물이 없을 시 미 출력
  // const a = undefined;
  // return <>{a}</>;

  // 화면 출력 결과물이 없을 시 미 출력
  // const a = { age: 1, name: "홍길동", live: true };
  // return (
  // <>
  // {/_ 객체 자체는 값이지만 글자, 숫자가 아니다. _/}
  // {/_ {a} _/}
  // <br />
  // {a.age}
  // <br />
  // {a.name}
  // <br />
  // {a.live}
  // </>
  // );

  // const arr = [1, 2, 3, 4];
  // return (
  // <>
  // {arr}
  // <br />
  // {arr[0]}
  // <br />
  // {arr[1]}
  // <br />
  // {arr[2]}
  // <br />
  // {arr[3]}
  // </>
  // );

  const arr = ["안", 20, true, null, undefined, "녕"];
  return (
    <>
      {arr}
      <br />
      {arr[0]}
      <br />
      {arr[1]}
      <br />
      {arr[2]}
      <br />
      {arr[3]}
      <br />
      {arr[4]}
      <br />
      {arr[5]}
      <br />
      {arr.length}
    </>
  );
}
```

export default App;

```js
function App() {
  // const age = 18;
  // return <>나이는 {age} 입니다.</>;

  // const age = 20;
  // return <>{`나이는 ${age} 입니다`}</>;

  const age = 25;
  return <>{"나이는 " + age + "살 입니다"}</>;
}

export default App;
```

```js
function App() {
  // function say() {
  //   return "안녕";
  // }
  // return <>{say()}</>;

  function say(who) {
    // return "안녕" + who + "!";
    return `안녕 ${who}!`;
  }

  return <>{say("경민")}</>;
}

export default App;
```

- 화살표 함수로 고치기

```js
const App = () => {
  // const say= () => {
  //   return "안녕";
  // }
  // return <>{say()}</>;

  const say = who => {
    // return "안녕" + who + "!";
    return `안녕 ${who}!`;
  };

  return <>{say("경민")}</>;
};

export default App;
```

#### 4.2. 조건문의 이해

#### 4.3. 반복문의 이해

#### 4.4. 이벤트(onClick, onChange)의 이해
