import React, { memo } from "react";

const Child = () => {
  console.log("========= 자식입니다.=======");
  return <div>Child</div>;
};

export default memo(Child);
