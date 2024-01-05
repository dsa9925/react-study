import React from "react";
import { useSearchParams } from "react-router-dom";

const ListPage = () => {
  // 쿼리 알아내기
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  // 현재 목록의 페이지 번호
  const page = urlSearchParams.get("page")
    ? parseInt(urlSearchParams.get("page"))
    : 1;
  // parse 해석하라
  // Integer 정수
  // parseInt(값)

  // 페이지 당 보여줄 갯수
  const size = urlSearchParams.get("size")
    ? parseInt(urlSearchParams.get("size"))
    : 10;

  return (
    <h1>
      ListPage Page : {page}, Size : {size}
    </h1>
  );
};

export default ListPage;
