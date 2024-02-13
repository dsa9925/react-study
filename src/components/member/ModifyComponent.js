import React, { useEffect, useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import { modifyMember } from "../../api/memberApi";
import ResultModal from "../common/ResultModal";

// 초기값
const initState = {
  email: "",
  nickname: "",
  pw: "",
};
const ModifyComponent = () => {
  const [memberInfo, setMemberInfo] = useState(initState);
  // 사용자 정보가 쿠키에 저장 되었고, RTK 에도 보관
  const { loginState, moveToPath } = useCustomLogin();

  // 화면이 보이면 보관하고 있던 내용으로 초기값 출력
  useEffect(() => {
    setMemberInfo({ ...loginState, pw: "1111" });
  }, [loginState]);

  const handleChange = e => {
    // e.target.name  e.target.value
    memberInfo[e.target.name] = e.target.value;
    setMemberInfo({ ...memberInfo });
  };

  const handleSubmit = e => {
    // 웹브라우저 갱신막기
    e.preventDefault();
    modifyMember({ memberInfo, successFn, failFn, errorFn });
  };
  const successFn = result => {
    console.log(result);
    setPopContent("내용수정이 성공하였습니다.");
    setResult(0);
  };
  const failFn = result => {
    console.log(result);
    setPopContent(result);
    setResult(1);
  };
  const errorFn = result => {
    console.log(result);
    setPopContent(result);
    setResult(2);
  };

  const [popContent, setPopContent] = useState("");
  const [result, setResult] = useState(0);
  const closeModal = () => {
    console.log("closeModal", result);
    if (result === 0) {
      // 정상처리(화면이동)
      moveToPath("/");
    } else {
      // 오류발생이므로 화면이동없이 창만닫기
      setPopContent("");
    }
  };

  return (
    <div>
      {popContent !== "" ? (
        <ResultModal
          title={"회원정보수정"}
          content={popContent}
          callFn={closeModal}
        />
      ) : null}

      <form>
        <div>
          <div>이메일</div>
          <div>
            <input
              type="email"
              name="email"
              readOnly
              value={memberInfo.email}
            />
          </div>
        </div>

        <div>
          <div>비밀번호</div>
          <div>
            <input
              type="password"
              value={memberInfo.pw}
              name="pw"
              onChange={e => handleChange(e)}
            />
          </div>
        </div>

        <div>
          <div>별칭</div>
          <div>
            <input
              type="text"
              value={memberInfo.nickname}
              name="nickname"
              onChange={e => handleChange(e)}
            />
          </div>
        </div>

        <div>
          <div>
            <button onClick={e => handleSubmit(e)}>수정</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModifyComponent;
