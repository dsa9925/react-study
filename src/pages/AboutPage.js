import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import useCustomLogin from "../hooks/useCustomLogin";

const AboutPage = () => {
  const { isLogin, moveToLogin } = useCustomLogin();
  if (!isLogin) {
    moveToLogin();
  }

  return (
    <BasicLayout>
      <h1>AboutPage</h1>
    </BasicLayout>
  );
};

export default AboutPage;
