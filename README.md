# React 공부하기

## 4. 컴포넌트 js의 이해

### 4.4. 이벤트(onClick, onChange)의 이해

- 기본 이벤트 : onClick, onChange
- onClick : 사용자가 태그 항목을 클릭한 경우 실행

  - element 를 선택 후 이벤트 적용

    ```html
    <button id="bt_plus">더하기</button>
    ```

    - 만약 js를 사용한 경우

    ```js
      const bt = document.querySelector("#bt_plus");
      // 아래코드는 onclick 에 값 처럼 기능을 담았음.
      // 값 처럼 처리 즉, 할당 되므로 1개의 기능만 실행된다.
      // onclick 을 이벤트라고 합니다.
      // 반드시 소문자로 작성합니다. 카멜케이스(x)
      bt.onclick = function(){ ... }
      ...
      bt.onclick = function(){ ... }
    ```

    ```js
    const bt = document.querySelector("#bt_plus");
    // 여러개의 기능 실행하고 싶은 경우라면 아래 코드 참조
    // 반드시 소문자로 이벤트를 작성한다.
    bt.addEventListener("click", function(){...})
    bt.addEventListener("click", function(){...})
    bt.addEventListener("click", function(){...})
    ```

    ```html
    <!-- 이렇게도 가능 -->
    <!-- 반드시 이벤트는 소문자로 작성합니다. -->
    <button id="bt_plus" onclick="함수()">더하기</button>
    ```

  - 리액트를 활용한 경우

  ```js
  // 이벤트 명은 반드시 카멜케이스로 작성하셔야 합니다.
  <button id="bt_plus" onclick="function(){ 함수실행() } ">
    더하기
  </button>
  ```

  ```js
  const App = () => {
    // 이벤트 처리
    let count = 0;
    // 버튼 더하기 기능
    // 일반적으로 이벤트에서 실행할 함수는 이름에다 handle 이라고 먼저 작성한다.
    // handle 다음에 이벤트명(Click)을 작성한다.
    // 아래는 클릭이벤트에 대한 처리 함수 이다.
    function handleClickAddBt() {}

    return (
      <div>
        <button
          onClick={function () {
            count = count + 1;
            console.log(count);
          }}
        >
          더하기
        </button>
        <button
          onClick={function () {
            count = count - 1;
            console.log(count);
          }}
        >
          빼기
        </button>
      </div>
    );
  };
  export default App;
  ```

  - 이벤트에서 실행할 함수는 분리를 시키는 것을 원칙으로 함.

  ```js
  const App = () => {
    // 이벤트 처리
    let count = 0;

    function handleClickAddBt() {
      count = count + 1;
      console.log(count);
    }

    function handleClickSubBt() {
      count = count + -1;
      console.log(count);
    }

    return (
      <div>
        <button
          onClick={() => {
            handleClickAddBt();
          }}
        >
          더하기
        </button>
        <button
          onClick={() => {
            handleClickSubBt();
          }}
        >
          빼기
        </button>
      </div>
    );
  };
  export default App;
  ```

```js
const App = () => {
  // 이벤트 처리
  let count = 0;

  const handleClickAddBt = () => {
    count = count + 1;
    console.log(count);
  };

  const handleClickSubBt = () => {
    count = count + -1;
    console.log(count);
  };

  return (
    <div>
      <button
        onClick={() => {
          handleClickAddBt();
        }}
      >
        더하기
      </button>
      <button
        onClick={() => {
          handleClickSubBt();
        }}
      >
        빼기
      </button>
    </div>
  );
};

export default App;
```

```js
const App = () => {
  // 이벤트 처리
  let count = 0;

  const handleClickAddBt = () => {
    count++;
    console.log(count);
  };

  const handleClickSubBt = () => {
    count--;
    console.log(count);
  };

  return (
    <div>
      <button
        onClick={() => {
          handleClickAddBt();
        }}
      >
        더하기
      </button>
      <button
        onClick={() => {
          handleClickSubBt();
        }}
      >
        빼기
      </button>
    </div>
  );
};

export default App;
```

- onChange : 사용자가 form 태그에서 내용을 변경한 경우 실행

  - 사용자가 데이터를 입력하는 태그에서 주로 활용(텍스트, 체크박스, 라디오 버튼 등)

  - js를 사용한 경우

  ```html
  <label for="user">아이디</label> <input type="text" name="user" id="user" />
  ```

  ```js
  const user = document.querySelector("#user");
  // 하나만 연결된다.
  // 반드시 소문자로 대입한다.
  user.addEventListener("change", function () {});
  user.addEventListener("change", function () {});
  user.addEventListener("change", function () {});
  ```

  ```html
  <!-- 반드시 소문자 -->
  <input type="text" name="user" id="user" onchange="함수명() /" />
  ```

  - 리액트를 사용한 경우

```js
import React from "react";

function App() {
  return (
    <div>
      <form action="/path" method="get">
        <fieldset>
          <legend>회원가입</legend>
          <label htmlFor="user">아이디</label>
          <input
            type="text"
            name="user"
            id="user"
            placeholder="아이디를 입력해주세요."
          />
          <input type="button" name="idcheck" value="중복확인" />
          <br />
          <label htmlFor="pw">비밀번호</label>
          <input type="password" name="pw" id="pw" />
          <br />
        </fieldset>

        <fieldset>
          <legend>정보입력</legend>
          <label>나이</label>
          <input type="number" name="age" id="age" />
          <br />
          <label htmlFor="gm">남성</label>
          <input type="radio" name="gender" value="m" id="gm" checked={true} />
          <label htmlFor="gf">여성</label>
          <input type="radio" name="gender" value="f" id="gf" />
          <br />
          <label htmlFor="js">JS</label>
          <input type="checkbox" name="js" id="js" />
          <label htmlFor="css">CSS</label>
          <input type="checkbox" name="css" id="css" />
          <label htmlFor="html">HTML</label>
          <input type="checkbox" name="html" id="html" />
          <br />
          <label htmlFor="level">성적등급</label>
          <select name="level" id="level">
            <option value={"A"}>A</option>
            <option value={"B"}>B</option>
            <option value={"C"}>C</option>
            <option value={"D"}>D</option>
          </select>
          <br />
          <label htmlFor="file">파일첨부</label>
          <input type="file" name="file" id="file" />
          <br />
          <label htmlFor="etc">기타사항</label>
          <textarea name="ect" id="etc"></textarea>
        </fieldset>

        <fieldset>
          <legend>버튼들</legend>
          <input type="reset" value="다시 작성" />
          <input type="submit" value="작성 완료" />
          <button type="button">버튼 작성 완료</button>
          <input type="image" src="images/a.jpg" />
        </fieldset>
      </form>
    </div>
  );
}

export default App;
```

```js
import React from "react";

const App = () => {
  return (
    <div>
      <form action="/path" method="get">
        <fieldset>
          <legend>회원가입</legend>
          <label htmlFor="user">아이디</label>
          <input
            type="text"
            name="user"
            id="user"
            placeholder="아이디 입력해주세요."
            onChange={function (event) {
              console.log(event.target);
              console.log(event.type);
              console.log(event.target.value);
            }}
          />
          <input type="button" name="idcheck" value="중복확인" />
          <br />
          <label htmlFor="pw">비밀번호</label>
          <input
            type="password"
            name="pw"
            id="pw"
            onChange={function (event) {
              console.log(event.target);
              console.log(event.type);
              console.log(event.target.value);
            }}
          />
          <br />
        </fieldset>

        <fieldset>
          <legend>정보입력</legend>
          <label htmlFor="age">나이</label>
          <input
            type="number"
            name="age"
            id="age"
            onChange={function (event) {
              console.log(event.target);
              console.log(event.type);
              console.log(parseInt(event.target.value));
            }}
          />
          <br />
          <label htmlFor="gm">남성</label>
          <input
            type="radio"
            name="gender"
            value="m"
            id="gm"
            checked={true}
            onClick={function (event) {
              console.log(event.target);
              console.log(event.type);
              console.log(event.target.value);
            }}
          />
          <label htmlFor="gf">여성</label>
          <input
            type="radio"
            name="gender"
            value="f"
            id="gf"
            onClick={function (event) {
              console.log(event.target);
              console.log(event.type);
              console.log(event.target.value);
            }}
          />

          <br />
          <label htmlFor="js">JS</label>
          <input
            type="checkbox"
            name="js"
            id="js"
            onClick={function (event) {
              console.log(event.target);
              console.log(event.type);
              console.log(event.target.value);
            }}
          />
          <label htmlFor="css">CSS</label>
          <input
            type="checkbox"
            name="css"
            id="css"
            onClick={function (event) {
              console.log(event.target);
              console.log(event.type);
              console.log(event.target.value);
            }}
          />
          <label htmlFor="html">HTML</label>
          <input
            type="checkbox"
            name="html"
            id="html"
            onClick={function (event) {
              console.log(event.target);
              console.log(event.type);
              console.log(event.target.value);
            }}
          />
          <br />
          <label htmlFor="level">성적등급</label>
          <select
            name="level"
            id="level"
            onChange={function (event) {
              console.log(event.target);
              console.log(event.type);
              console.log(event.target.value);
            }}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          <br />
          <label htmlFor="file">파일첨부</label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={function (event) {
              console.log(event.target);
              console.log(event.type);
              console.log(event.target.value);
            }}
          />
          <br />
          <label htmlFor="etc">기타사항</label>
          <textarea
            name="etc"
            id="etc"
            onChange={function (event) {
              console.log(event.target);
              console.log(event.type);
              console.log(event.target.value);
            }}
          ></textarea>
        </fieldset>

        <fieldset>
          <legend>버튼들</legend>
          <input type="reset" value="다시작성" />
          <input type="submit" value="작성완료" />
          <button type="button">버튼 작성 완료</button>
          <input type="image" src="images/a.jpg" />
        </fieldset>
      </form>
    </div>
  );
};

export default App;
```

```js
import React from "react";

const App = () => {
  // 입력값 제어 함수
  const handleChangeJoinForm = event => {
    console.log(event.target);
    console.log(event.type);
    console.log(event.target.value);
  };

  return (
    <div>
      <form action="/path" method="get" name="join">
        <fieldset>
          <legend>회원가입</legend>
          <label htmlFor="user">아이디</label>
          <input
            type="text"
            name="user"
            id="user"
            placeholder="아이디 입력해주세요."
            onChange={function (event) {
              handleChangeJoinForm(event);
            }}
          />
          <input type="button" name="idcheck" value="중복확인" />
          <br />
          <label htmlFor="pw">비밀번호</label>
          <input
            type="password"
            name="pw"
            id="pw"
            onChange={function (event) {
              handleChangeJoinForm(event);
            }}
          />
          <br />
        </fieldset>

        <fieldset>
          <legend>정보입력</legend>
          <label htmlFor="age">나이</label>
          <input
            type="number"
            name="age"
            id="age"
            onChange={function (event) {
              handleChangeJoinForm(event);
            }}
          />
          <br />
          <label htmlFor="gm">남성</label>
          <input
            type="radio"
            name="gender"
            value="m"
            id="gm"
            checked={true}
            onClick={function (event) {
              handleChangeJoinForm(event);
            }}
          />
          <label htmlFor="gf">여성</label>
          <input
            type="radio"
            name="gender"
            value="f"
            id="gf"
            onClick={function (event) {
              handleChangeJoinForm(event);
            }}
          />

          <br />
          <label htmlFor="js">JS</label>
          <input
            type="checkbox"
            name="js"
            id="js"
            onClick={function (event) {
              handleChangeJoinForm(event);
            }}
          />
          <label htmlFor="css">CSS</label>
          <input
            type="checkbox"
            name="css"
            id="css"
            onClick={function (event) {
              handleChangeJoinForm(event);
            }}
          />
          <label htmlFor="html">HTML</label>
          <input
            type="checkbox"
            name="html"
            id="html"
            onClick={function (event) {
              handleChangeJoinForm(event);
            }}
          />
          <br />
          <label htmlFor="level">성적등급</label>
          <select
            name="level"
            id="level"
            onChange={function (event) {
              handleChangeJoinForm(event);
            }}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          <br />
          <label htmlFor="file">파일첨부</label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={function (event) {
              handleChangeJoinForm(event);
            }}
          />
          <br />
          <label htmlFor="etc">기타사항</label>
          <textarea
            name="etc"
            id="etc"
            onChange={function (event) {
              handleChangeJoinForm(event);
            }}
          ></textarea>
        </fieldset>

        <fieldset>
          <legend>버튼들</legend>
          <input type="reset" value="다시작성" />
          <input type="submit" value="작성완료" />
          <button type="button">버튼 작성 완료</button>
          <input type="image" src="images/a.jpg" />
        </fieldset>
      </form>
    </div>
  );
};

export default App;
```

```js
import React from "react";

const App = () => {
  // 입력값 제어 함수
  const handleChangeJoinForm = event => {
    console.log(event.target);
    console.log(event.type);
    console.log(event.target.value);
  };

  return (
    <div>
      <form action="/path" method="get" name="join">
        <fieldset>
          <legend>회원가입</legend>
          <label htmlFor="user">아이디</label>
          <input
            type="text"
            name="user"
            id="user"
            placeholder="아이디 입력해주세요."
            onChange={event => {
              handleChangeJoinForm(event);
            }}
          />
          <input type="button" name="idcheck" value="중복확인" />
          <br />
          <label htmlFor="pw">비밀번호</label>
          <input
            type="password"
            name="pw"
            id="pw"
            onChange={event => {
              handleChangeJoinForm(event);
            }}
          />
          <br />
        </fieldset>

        <fieldset>
          <legend>정보입력</legend>
          <label htmlFor="age">나이</label>
          <input
            type="number"
            name="age"
            id="age"
            onChange={event => {
              handleChangeJoinForm(event);
            }}
          />
          <br />
          <label htmlFor="gm">남성</label>
          <input
            type="radio"
            name="gender"
            value="m"
            id="gm"
            checked={true}
            onClick={event => {
              handleChangeJoinForm(event);
            }}
          />
          <label htmlFor="gf">여성</label>
          <input
            type="radio"
            name="gender"
            value="f"
            id="gf"
            onClick={event => {
              handleChangeJoinForm(event);
            }}
          />

          <br />
          <label htmlFor="js">JS</label>
          <input
            type="checkbox"
            name="js"
            id="js"
            onClick={event => {
              handleChangeJoinForm(event);
            }}
          />
          <label htmlFor="css">CSS</label>
          <input
            type="checkbox"
            name="css"
            id="css"
            onClick={event => {
              handleChangeJoinForm(event);
            }}
          />
          <label htmlFor="html">HTML</label>
          <input
            type="checkbox"
            name="html"
            id="html"
            onClick={event => {
              handleChangeJoinForm(event);
            }}
          />
          <br />
          <label htmlFor="level">성적등급</label>
          <select
            name="level"
            id="level"
            onChange={event => {
              handleChangeJoinForm(event);
            }}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          <br />
          <label htmlFor="file">파일첨부</label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={event => {
              handleChangeJoinForm(event);
            }}
          />
          <br />
          <label htmlFor="etc">기타사항</label>
          <textarea
            name="etc"
            id="etc"
            onChange={event => {
              handleChangeJoinForm(event);
            }}
          ></textarea>
        </fieldset>

        <fieldset>
          <legend>버튼들</legend>
          <input type="reset" value="다시작성" />
          <input type="submit" value="작성완료" />
          <button type="button">버튼 작성 완료</button>
          <input type="image" src="images/a.jpg" />
        </fieldset>
      </form>
    </div>
  );
};

export default App;
```

```js
import React from "react";

const App = () => {
  // 입력값 제어 함수
  const handleChangeJoinForm = event => {
    // console.log(event.target);
    // console.log(event.type);
    console.log(event.target.value);
    console.log(event.target.name);
    // console.log(event.target.type);
    // console.log(event.target.id);
  };

  return (
    <div>
      <form action="/path" method="get" name="join">
        <fieldset>
          <legend>회원가입</legend>
          <label htmlFor="user">아이디</label>
          <input
            type="text"
            name="user"
            id="user"
            placeholder="아이디 입력해주세요."
            onChange={event => {
              handleChangeJoinForm(event);
            }}
          />
          <input type="button" name="idcheck" value="중복확인" />
          <br />
          <label htmlFor="pw">비밀번호</label>
          <input
            type="password"
            name="pw"
            id="pw"
            onChange={event => {
              handleChangeJoinForm(event);
            }}
          />
          <br />
        </fieldset>

        <fieldset>
          <legend>정보입력</legend>
          <label htmlFor="age">나이</label>
          <input
            type="number"
            name="age"
            id="age"
            onChange={event => {
              handleChangeJoinForm(event);
            }}
          />
          <br />
          <label htmlFor="gm">남성</label>
          <input
            type="radio"
            name="gender"
            value="m"
            id="gm"
            checked={true}
            onClick={event => {
              handleChangeJoinForm(event);
            }}
          />
          <label htmlFor="gf">여성</label>
          <input
            type="radio"
            name="gender"
            value="f"
            id="gf"
            onClick={event => {
              handleChangeJoinForm(event);
            }}
          />

          <br />
          <label htmlFor="js">JS</label>
          <input
            type="checkbox"
            name="js"
            id="js"
            onClick={event => {
              handleChangeJoinForm(event);
            }}
          />
          <label htmlFor="css">CSS</label>
          <input
            type="checkbox"
            name="css"
            id="css"
            onClick={event => {
              handleChangeJoinForm(event);
            }}
          />
          <label htmlFor="html">HTML</label>
          <input
            type="checkbox"
            name="html"
            id="html"
            onClick={event => {
              handleChangeJoinForm(event);
            }}
          />
          <br />
          <label htmlFor="level">성적등급</label>
          <select
            name="level"
            id="level"
            onChange={event => {
              handleChangeJoinForm(event);
            }}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          <br />
          <label htmlFor="file">파일첨부</label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={event => {
              handleChangeJoinForm(event);
            }}
          />
          <br />
          <label htmlFor="etc">기타사항</label>
          <textarea
            name="etc"
            id="etc"
            onChange={event => {
              handleChangeJoinForm(event);
            }}
          ></textarea>
        </fieldset>

        <fieldset>
          <legend>버튼들</legend>
          <input type="reset" value="다시작성" />
          <input type="submit" value="작성완료" />
          <button type="button">버튼 작성 완료</button>
          <input type="image" src="images/a.jpg" />
        </fieldset>
      </form>
    </div>
  );
};

export default App;
```
