import React, { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getList } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";
import useCustomMove from "../../hooks/useCustomMove";

// 서버 데이터 초기값 객체
const initState = {
  current: 0,
  dtoList: [],
  next: false,
  nextPage: 0,
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  prevPage: 0,
  totalCount: 0,
  totalPage: 0,
};

const ListComponent = () => {
  const { page, size, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);

  // useEffect 의 이해
  // 외부 API 데이터 연동시 활용한다.
  // useEffect 는 아래 코드의 경우는 한번만 실행이된다.
  // useEffect 는 실행함수, 배열이 전달된다.
  // useEffect (실행함수, [] ) 의 형태이다.
  // [] 에는 감시할 대상을 작성한다.
  // [] 에 감시할 변수를 적어주면, 변수가 변할때 마다
  // 함수가 자동으로 실행된다.
  // 그래서 []  는  외부 변수에 의존하기 때문에 의존성 배열이라고 한다.
  // 현재 아래코드에서는 [] 안에 내용이 모두 비어있다.
  // 그래서 아무것도 의존하지 않기 때문에 화면에 보일때
  // 한번 실행되고 끝이다.
  useEffect(() => {
    getList({ page, size })
      .then(result => {
        // console.log("결과", result);
        setServerData(result);
      })
      .catch(error => {
        console.log("에러", error);
        alert("데이터 호출에 실패하였습니다.");
      });
  }, [page, size]);

  return (
    <div>
      <h1>목록 페이지</h1>
      <div>
        {serverData.dtoList.map(item => (
          <div key={item.tno}>
            <div
              onClick={() => {
                moveToRead(item.tno);
              }}
            >
              {item.tno} {item.writer} {item.dueDate}
            </div>
          </div>
        ))}
      </div>
      {/* 페이징 처리 */}
      <PageComponent serverData={serverData} />
    </div>
  );
};

export default ListComponent;
