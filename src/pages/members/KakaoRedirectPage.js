import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const KakaoRedirectPage = () => {
  const [uRLSearchParams, setURLSearchParams] = useSearchParams();
  // 인증코드 파악하기
  const authCode = uRLSearchParams.get("code");

  // 로그인 과정을 위한 loginSlice 을 통해서 로그인시도
  const dispatch = useDispatch();
  const { moveToPath } = useCustomLogin();

  // 인증코드로 Access Token 요청하기
  useEffect(() => {
    getAccessToken(authCode).then(accessToken => {
      console.log("access Token", accessToken);
      // 개인 정보 호출
      getMemberWithAccessToken(accessToken).then(memberInfo => {
        console.log("-------------------");
        console.log(memberInfo);
        // API 백엔드 서버로 로그인을 시도합니다.

        dispatch(login(memberInfo));

        // 소셜회원이 아니라면
        if (memberInfo && !memberInfo.social) {
          // 첫페이지로 이동
          moveToPath("/");
        } else {
          // 정보 수정창으로 이동
          moveToPath("/member/modify");
        }
      });
    });
  }, [authCode]);

  return (
    <div>
      <h1>카카오 리다이렉트 페이지</h1>
      <div>{authCode}</div>
    </div>
  );
};

export default KakaoRedirectPage;
