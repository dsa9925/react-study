import React, { useState } from "react";

const Input = ({ getTitle }) => {
  // 화면 리랜더링을 위한 state 즉, 상태변경을 관리한다.
  const [title, setTitle] = useState("");
  const handleChange = e => {
    setTitle(e.target.value);
  };
  const handleClick = e => {
    // 반드시.. 절대로 잊지말자.
    // 기본 기능 막기
    e.preventDefault();
    if (title === "") {
      alert("제목을 입력하세요.");
      return;
    }
    getTitle(title);
    alert("제목을 등록하였습니다.");
    setTitle("");
  };
  return (
    <form>
      <label htmlFor="title">제목</label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={e => handleChange(e)}
      />
      <button type="submit" onClick={e => handleClick(e)}>
        입력
      </button>
    </form>
  );
};

export default Input;
