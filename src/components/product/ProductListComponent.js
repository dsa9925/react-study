import React, { useEffect, useState } from "react";
import { getList } from "../../api/productApi";
import useCustomMove from "../../hooks/useCustomMove";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";
import Fetching from "../common/Fetching";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// 이미지 서버 API 주소
const host = API_SERVER_HOST;

// 기본 상태 데이터
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
const ProductListComponent = () => {
  const { page, size, moveToRead, moveToList, refresh } = useCustomMove();
  // const [serverData, setServerData] = useState(initState);
  // 로딩창
  // const [fetching, setFetching] = useState(false);

  // 최초 데이터 가져오기
  // useEffect 는 Hook 이고, [] 안쪽 변수가 변하면 실행된다.
  // 현재 page 가 변하거나, size 가 변하면 실행된다.
  // useEffect(() => {
  //   setFetching(true);

  //   const param = { page, size };
  //   getList({ param, successFn, failFn, errorFn });
  // }, [page, size]);

  // ReactQuery 를 이용해서 API 연동으로 읽겠다(Get)
  // 리턴되는 데이터 중에 필요한 것을 문서를 참조하자.

  // client.invalidateQueries(키명) 를 하기 싫으신분들을 위한 처리

  const { data, isFetching, error, isError } = useQuery({
    // 상태관리 구분을 위한 변수를 만들자.
    queryKey: ["products/list", { page, size, refresh }],
    // 외부 API 호출
    // 주의 사항 : axios 는 결과를 리턴한다.
    queryFn: () => getList({ page, size }),
    // 일정시간 즉 fresh 시간동안 API 호출 안함.
    staleTime: 1000 * 60,
  });

  // useQuery 의 리턴값이 data 를 화면에 출력한다.
  // 화면일 리랜더링이 되는 이유는 ReactQuery 가 웹 전체의 상태(state)
  const serverData = data || initState;

  // 강제로 ReactQuery 키(변수명:"products/list") 값을 지우기
  // ReactQuery 는 App.js 에 client 등록해두었다.
  const client = useQueryClient();
  const handleClickPage = pageParma => {
    // parseInt : 숫자로 변환하라
    // console.log(page);
    // console.log(typeof page);
    // if (pageParma.page === parseInt(page)) {
    //   // 검색에서 자주 나오는 해결법입니다.
    //   client.invalidateQueries("products/list");
    // }

    moveToList(pageParma);
  };

  // 데이터 연동 처리 결과
  // const successFn = result => {
  //   // setFetching(false);
  //   // setServerData(result);
  //   console.log(result);
  // };
  // const failFn = result => {
  //   // setFetching(false);
  //   console.log(result);
  // };
  // const errorFn = result => {
  //   // setFetching(false);
  //   console.log(result);
  // };

  return (
    <div>
      {isFetching ? <Fetching /> : null}

      <div>
        {serverData.dtoList.map(item => (
          <div key={item.pno} onClick={() => moveToRead(item.pno)}>
            {/* 제품번호 */}
            <div>{item.pno}</div>
            {/* 내용 */}
            <div>
              {/* 이미지 */}
              <div>
                {/* 백엔드에서 업로드 된 이미지의 섬네일 만들기를 요청해 보자 */}
                <img
                  src={`${host}/api/products/view/s_${item.uploadFileNames[0]}`}
                  alt={item.pname}
                />
              </div>
              {/* 제품정보 */}
              <div>
                <div>이름 : {item.pname}</div>
                <div>가격 : {item.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PageComponent serverData={serverData} movePage={handleClickPage} />
    </div>
  );
};

export default ProductListComponent;
