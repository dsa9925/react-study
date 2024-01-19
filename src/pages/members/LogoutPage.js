import React from "react";
import useCustomLogin from "../../hooks/useCustomLogin";

const LogoutPage = () => {
  // const dispatch = useDispatch();
  const { moveToPath, doLogout } = useCustomLogin();
  const handleClick = () => {
    doLogout();
    moveToPath("/member/login");
  };

  return (
    <div>
      <h2>로그아웃하시겠습니까?</h2>
      <div>
        <button onClick={handleClick}>로그아웃</button>
      </div>
    </div>
  );
};

export default LogoutPage;
