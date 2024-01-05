import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

const ModifyPage = () => {
  // 패스 이동하기
  const navigate = useNavigate();
  // 몇번 글 수정되는 지 파악
  const { tno } = useParams();
  // 쿼리 알아내기
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  // 현재 목록의 페이지 번호
  const page = urlSearchParams.get("page")
    ? parseInt(urlSearchParams.get("page"))
    : 1;
  // parse 해석하라
  // Integer 정수
  // parseInt(값)

  // 페이지당 보여줄 개수
  const size = urlSearchParams.get("size")
    ? parseInt(urlSearchParams.get("size"))
    : 10;

  // 쿼리스트링 만들기
  const queryStr = createSearchParams({ page, size }).toString();

  const handleClickDelete = _tno => {
    console.log("삭제");
  };
  const handleClickComplete = _tno => {
    console.log("수정완료");
  };
  const handleClickCancel = _tno => {
    navigate({ pathname: `/todo/read/${tno}`, search: queryStr });
  };
  return (
    <div>
      ModifyPage 글 번호 {tno}
      <div>
        <button onClick={() => handleClickDelete(tno)}>삭제</button>
        <button onClick={() => handleClickComplete(tno)}>완료</button>
        <button onClick={() => handleClickCancel(tno)}>취소</button>
      </div>
    </div>
  );
};

export default ModifyPage;
