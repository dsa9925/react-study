import { useState } from "react";

// 입력창 콤포넌트
const Input = ({ showTodoTxt }) => {
  const [txt, setTxt] = useState("");
  const handleChangeTxt = e => {
    // console.log(e.target)
    setTxt(e.target.value);
  };
  const handleSubmit = e => {
    if (txt === "") {
      alert("내용을 입력하세요.");
      return;
    }

    alert("데이터를 추가하였습니다.");
    showTodoTxt(txt);

    setTxt("");
  };
  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          name="txt"
          value={txt}
          onChange={e => handleChangeTxt(e)}
        />
        <button>할일추가</button>
      </form>
    </div>
  );
};

export default Input;
