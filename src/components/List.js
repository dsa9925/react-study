import React from "react";

const List = ({ datas }) => {
  return (
    <ul>
      {/* {배열.map(function(요소,순번){
        return (JSX)
    })} */}

      {datas.map(function (item, index) {
        return <li key={index}>{item}</li>;
      })}
    </ul>
  );
};

export default List;
