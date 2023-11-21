import React from "react";
import { useState } from "react";

const App = () => {
  // 사용자 아이디 보관 및 리랜더링
  const [userId, setUserId] = useState("");

  // 사용자 패스워드 보관 및 리랜더링
  const [userPass, setUserPass] = useState("");

  // 데이터 전송
  const handleSubmit = e => {
    // 반드시 기본 동작을 막아준다.
    e.preventDefault();
    console.log(userId, userPass);
    if (userId === "") {
      alert("아이디를 입력하세요.");
      return;
    }
    if (userPass === "") {
      alert("패스워드를 입력하세요.");
      return;
    }
    alert("데이터가 등록되었습니다.");
    setUserId("");
    setUserPass("");
  };

  // 폼 입력 처리
  const handleChange = e => {
    // console.log(e.target);
    if (e.target.name === "user") {
      setUserId(e.target.value);
    }
    if (e.target.name === "pw") {
      setUserPass(e.target.value);
    }
  };
  return (
    <div>
      <form action="path" method="get" onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          name="user"
          value={userId}
          onChange={e => handleChange(e)}
        />
        <input
          type="password"
          name="pw"
          value={userPass}
          onChange={e => handleChange(e)}
        />
        <button type="submit">완료</button>
      </form>
    </div>
  );
};

export default App;
