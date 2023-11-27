import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Notice = () => {
  // 주소창에 전달된 정보를 분석하기
  const location = useLocation();
  console.log(location);
  // 주소창에 쿼리 전달하기 및 페이지이동하기
  const navigate = useNavigate();
  // 쿼리 스트링 처리하기
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  // 쿼리 중에 page 를 알고싶다.
  let page = searchParams.get("page");
  page = parseInt(page);
  console.log(page);
  // 쿼리 중에 user 를 알고 싶다.
  const user = searchParams.get("user");
  console.log(user);
  // 쿼리 중에 total 을 알고 싶다.
  let total = searchParams.get("total");
  total = parseInt(total);

  console.log(total);

  const handleClickPrev = () => {
    console.log("이전목록");
    // 현재 page 에서 1 을 빼서 1보다 작으면 1
    // 그렇지 않으면 1을 뺀 값을 출력한다.

    // page = page - 1;
    // page -= 1;
    // page --;
    // if (page < 1) {
    //   page = 1;
    // }

    // page = page <= 1 ? 1 : --page;
    page -= 1;
    if (page == 0) {
      page = 1;
    }

    console.log(page + "페이지 보여줘");
    // 샘플 코드
    navigate(`${location.pathname}?page=${page}&user=${user}&total=${total}`);
  };
  const handleClickNext = () => {
    console.log("다음목록");
    // 만약에 현재 page 가 total 보다 작다면
    // page 에 1 증가한 결과를 반영한다.
    // if (page < total) {
    //   page = page + 1;
    // }
    // page += 1;
    // page = page + 1;
    // page ++;
    page = page < total ? ++page : total;
    console.log(page);
    // 샘플 코드
    navigate(`${location.pathname}?page=${page}&user=${user}&total=${total}`);
  };

  return (
    <div>
      <h2>Notice</h2>
      <p>
        현재 페이지 {page} / 총페이지 {total}
      </p>
      <div>공지사항의 {user} 목록</div>
      <div>
        <button
          onClick={() => {
            handleClickPrev();
          }}
        >
          이전페이지
        </button>
        <div>페이지번호 출력</div>
        <button
          onClick={() => {
            handleClickNext();
          }}
        >
          다음페이지
        </button>
      </div>
    </div>
  );
};

export default Notice;
