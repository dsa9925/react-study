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
