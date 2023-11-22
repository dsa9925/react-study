import React, { useState } from "react";
import styled from "@emotion/styled";
import Title from "./components/Title";
import Input from "./components/Input";
import List from "./components/List";

const App = () => {
  const TodoApp = styled.div`
    position: relative;
    display: block;
    max-width: 760px;
    min-width: 480px;
    margin: 50px auto;
    background: skyblue;
    text-align: center;
  `;

  const showMessage = () => {
    alert("안녕하세요. 퐛팅");
  };
  const sayHi = message => {
    alert(`당신의 인사는 ${message}이군요`);
  };
  const showTodoTxt = title => {
    alert(`전달받은 제목은 ${title} 입니다.`);
    // 1. 목록 전체 배열을 복사하여서 새로운 배열을 만든다.
    const newData = [...data];
    newData.push(title); // 배열 요소 추가
    // 2. setData에 복사한 배열로 교체한다.
    setData(newData);
  };
  const [data, setData] = useState([]);

  return (
    <TodoApp>
      <Title
        today="수요일"
        myname="김도현"
        month={11}
        day={22}
        say={showMessage}
        gogo={sayHi}
      >
        오늘 할일 샘플
      </Title>
      <Input showTodoTxt={showTodoTxt} />
      <List data={data} />
    </TodoApp>
  );
};

export default App;
