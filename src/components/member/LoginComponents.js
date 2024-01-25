import React, { useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getKakaoLoginLink } from "../../api/kakaoApi";
import { Link } from "react-router-dom";

// 초기값
const initState = {
  email: "",
  pw: "",
};
const LoginComponents = () => {
  const [loginParam, setLoginParam] = useState(initState);
  const handleChange = e => {
    // e.target.name
    // e.target.value
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };

  // 커스터훅 사용하기
  const { doLogin, moveToPath } = useCustomLogin();

  // slice 값(state)을 읽을때        useSelector
  // slice 값(state)를 업데이트할때  useDispatch()
  // const dispatch = useDispatch();
  const handleClick = e => {
    // // loginSlice 의  state 업데이트
    // // dispatch(login(loginParam));
    // dispatch(loginPostAsync({ loginParam, successFn, failFn, errorFn }));

    // 아래 구문을 실행하고 나면 Promise 돌려 받아요
    doLogin({ loginParam, successFn, failFn, errorFn });
  };

  const successFn = result => {
    console.log("성공", result);
    moveToPath("/");
  };

  const failFn = result => {
    console.log("실패", result);
    alert("이메일 및 비밀번호 확인하세요.");
  };

  const errorFn = result => {
    console.log("서버 에러", result);
  };

  // 카카오 로그인
  const kakaoLogin = getKakaoLoginLink();

  return (
    <div>
      <div>
        <div>이메일</div>
        <div>
          <input
            type="email"
            name="email"
            value={loginParam.email}
            onChange={e => handleChange(e)}
          />
        </div>
      </div>

      <div>
        <div>비밀번호</div>
        <div>
          <input
            type="password"
            name="pw"
            value={loginParam.pw}
            onChange={e => handleChange(e)}
          />
        </div>
      </div>

      <div>
        <button onClick={handleClick}>로그인</button>
      </div>

      <div>
        <Link to={kakaoLogin}>카카오로그인</Link>
      </div>
    </div>
  );
};

export default LoginComponents;
