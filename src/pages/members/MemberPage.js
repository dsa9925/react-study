import React from "react";
import { Outlet } from "react-router";
import BasicLayout from "../../layouts/BasicLayout";

const MemberPage = () => {
  return (
    <BasicLayout>
      <h1>회원기능</h1>
      <Outlet />
    </BasicLayout>
  );
};

export default MemberPage;
