import React from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

const ReadPage = () => {
  // 패스로 이동하기
  const navigate = useNavigate();
  // parmas 알아내기
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

  // 페이지 당 보여줄 갯수
  const size = urlSearchParams.get("size")
    ? parseInt(urlSearchParams.get("size"))
    : 10;

  // 쿼리스트링 만들기
  const queryStr = createSearchParams({ page, size }).toString();

  const handleClickModify = _tno => {
    navigate({ pathname: `/todo/modify/${tno}`, search: queryStr });
  };
  const handleClickList = () => {
    navigate({ pathname: `/todo/list`, search: queryStr });
  };

  return (
    <div>
      읽기 화면 {tno}
      <div>
        <button onClick={() => handleClickModify(tno)}>수정하기</button>
        <button onClick={() => handleClickList()}>목록보기</button>
      </div>
    </div>
  );
};

export default ReadPage;
