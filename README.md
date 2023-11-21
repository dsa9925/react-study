# React 공부하기

## 4. 컴포넌트 js의 이해

### 4.5. 이벤트(onSubmit)의 이해

- 주의사항 (form 태그 안의 button 주의하세요.)

  ```html
  <button>버튼</button>
  ```

  ```html
  <!-- 이러시면 곤란합니다. submit 실행됩니다. -->
  <form>
    <!-- 자동으로 type 이 submit 셋팅됩니다. -->
    <!-- form 의 데이터를 전송하겠다는 의미 -->
    <button>버튼</button>
  </form>
  ```

  ```html
  <form>
    <!-- form 안에서 type 을 명시한 경우  -->
    <button type="button">버튼</button>
  </form>
  ```

- onSubmit 적용하기

  ```js
  <form action="/path" method="get" name="join" onSubmit={function (event) {}}>
    ...
  </form>
  ```

  ```js
  <form action="/path" method="get" name="join" onSubmit={event => {}}>
    ...
  </form>
  ```

  ```js
   // 데이터 전송 처리 함수
  const handleSubmitJoinForm = event => {};
  ....
  <form
        action="/path"
        method="get"
        name="join"
        onSubmit={event => handleSubmitJoinForm(event)}
      >
  ....
  </form>
  ```

- 반드시 form 처리를 해야 합니다.

```js
// 데이터 전송 처리 함수
const handleSubmitJoinForm = event => {
  // 기본 동작 막기
  event.preventDefault();

  console.log(event);
  console.log(event.type);
  console.log(event.target);
  console.log(event.target.name);
  console.log(event.target.action);
  console.log(event.target.method);
  console.log(event.target.onSubmitd);
};
```
