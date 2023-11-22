import { useState } from "react";

// 목록 컴포넌트
const List = ({ data }) => {
  return (
    <div>
      <ul>
        {data.map(function (item, index) {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
};

export default List;
