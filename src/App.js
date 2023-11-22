import styled from "@emotion/styled";
import React, { useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import List from "./components/List";
import Footer from "./components/Footer";

const App = () => {
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
  // Input으로 부터 글자를 전달 받는 함수
  const getTitle = title => {
    console.log(title);
    // 배열 뜯어서 복사하기 (Spread)
    const newDatas = [...datas];
    // 새로운 요소 추가하기
    newDatas.push(title);
    // state 업데이트 하기
    setDatas(newDatas);
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
