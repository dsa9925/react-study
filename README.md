# React 공부하기

## 7. 자료 임시 저장 및 임시 불러오기

### 7.2 자료 임시 저장( localStorage 활용 )

- 웹브라우저 저장소
- 로그인 정보 및 현재 path 등등등..
- 웹브라우저 F12 개발도구 > Application 탭
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

```js
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import List from "./components/List";
import Footer from "./components/Footer";
import { getData, postData } from "./api/api";

const App = () => {
  // 컴포넌트가 화면에 완벽히 보여줄 준비가 완료되면
  // 그때 자료를 호출하겠다.
  useEffect(function () {
    // localStorage 자료 가져오기
    const arr = getData();
    // 화면에 출력할 state 로 업데이트 한다.
    // 1.원본 배열을 복사본으로 만들고
    const newArr = [...arr];
    // 2. 복사본 배열을 화면에 출력할 state 에 담아서 업데이트 한다.
    setDatas(newArr);
  }, []);

  const Layout = styled.div`
    position: relative;
    display: block;
    max-width: 960px;
    min-width: 480px;
    border-radius: 10px;
    background: skyblue;
    text-align: center;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
  `;
  // Input 으로 부터 글자를 전달 받는 함수
  const getTitle = title => {
    console.log(title);
    // 배열 뜯어서 복사하기 ( Spread )
    const newDatas = [...datas];
    // 새로운 요소 추가하기
    newDatas.push(title);
    // state 업데이트 하기
    setDatas(newDatas);
    // 저장하자.
    // 저장하기 위한 글자를 만들자.
    postData(newDatas);
  };
  const [datas, setDatas] = useState([]);
  return (
    <Layout>
      <Header version="1.0">
        <b>Todo App</b>
      </Header>
      <Input getTitle={getTitle} />
      <List datas={datas}>목록</List>
      <Footer>하단</Footer>
    </Layout>
  );
};

export default App;
```

```js
// 추가하기
export const postData = function (datas) {
  console.log(datas);
  // 1. 보관을 할 때는 문자열로 만들어서 보관합니다.
  // 2. 로컬스토리지는 배열을 저장 못합니다.
  // 3. 로컬스토리지는 숫자를 저장 못합니다.
  // 4. 로컬스토리지는 객체를 저장 못합니다.
  // 5. 로컬스토리지는 boolean 을 저장 못합니다.
  // 6. 로컬스토리지는 []을 저장 못합니다.
  // 7. 로컬스토리지는 function을 저장 못합니다.
  // 8. 결론 그래서 문자열 형태로만 저장 됩니다.
  const saveData = JSON.stringify(datas);
  console.log(saveData);
  localStorage.setItem("todo", saveData);
};
// 읽어오기
export const getData = function () {
  // 로컬에 저장해 둔 목록을 배열에 담아줌.
  let todoArr;
  //   먼저 "todo"라고 저장해둔 Key를 이용 해서 목록을 불러온다
  const result = localStorage.getItem("todo");

  if (!result) {
    // "todo"라는 key 가 없을 경우,
    // 강제로 생성 및 초기값을 셋팅
    localStorage.setItem("todo", "[]");
    // 사용할 목록 배열이 없다고 셋팅을 했어요.
    todoArr = [];
  } else {
    // "todo" 라는 Key가 있으므로
    // 현재 저장해 둔 값을 읽어서 모록으로 변환합니다.
    // 왜 변환을 해야 하냐면...
    //  저장된 값은 문자열이라서 입니다.
    // JSON.parse 를 이용해서 JS 객체로 변환합니다.
    todoArr = JSON.parse(result);
  }

  return todoArr;
};
// 수정하기
export const putData = function () {};
// 삭제하기
export const deleteData = function () {};
```
