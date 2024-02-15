# ReactQuery

- API 백엔드 서버와 통신 전용(비동기)
- Web Application 전체 상태 관리
- 레퍼런스 [https://tanstack.com/query/latest/docs/framework/react/overview]

## 1. 버전 선택시 주의 사항

- V5 : 리액트 18 버전 이상
- V4 : 리액트 16.8 버전 이상
- V3 : 리액트 16.8 버전 이상

## 2. V5 설치

`npm i @tanstack/react-query`

## 3. 개발자 도구

`npm i @tanstack/react-query-devtools`

## 4. ReactQuery 셋팅

- 웹앱 전체 상태관리 / API 백엔드 연동
- index.js 또는 App.js

```js
import { RouterProvider } from "react-router-dom";
import router from "./router/root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// ReactQuey 셋팅
// 왜 App.js 에서 셋팅을 할까? (웹서비스 전체에 상태관리)
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
};

export default App;
```

## 5. ReactQuery Devtools 셋팅

- src/App.js

```js
import { RouterProvider } from "react-router-dom";
import router from "./router/root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// ReactQuey 셋팅
// 왜 App.js 에서 셋팅을 할까? (웹서비스 전체에 상태관리)
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* 리액트쿼리 개발자도구 */}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

export default App;
```

## 6. ReactQuery 데이터 연동

- useQuery()
  : API 백엔드 서버에서 데이터를 읽을 때

- useMutaion()
  : API 백엔드 서버에서 데이터를 변경할떄

## 7. useQuery 활용하여 데이터 읽기

- API 참조하기(V5)
  : https://tanstack.com/query/latest/docs/framework/react/reference/useQuery

- API 기본 구조 분석

```js
const {
  리턴되는 값,
  리턴되는 값,
  리턴되는 값,
} = useQuery(
  {
    매개변수이름: 매개변수값,
    매개변수이름: 매개변수값,
    매개변수이름: 매개변수값,
  },
  queryClient,
)
```

- src/components/product/ProductReadComponent.js

```js
import { getOne } from "../../api/productApi";
import { API_SERVER_HOST } from "../../api/todoApi";
import Fetching from "../common/Fetching";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomLogin from "../../hooks/useCustomLogin";
// ReactQuery 활용
import { useQuery } from "@tanstack/react-query";
// 이미지 API 주소
const host = API_SERVER_HOST;

// 화면 출력 상태 정보
const initState = {
  pno: 0,
  pname: "",
  price: 0,
  pdesc: "",
  delFlag: false,
  files: [],
  uploadFileNames: [],
};

const ProductReadComponent = ({ pno }) => {
  // const [product, setProduct] = useState(initState);

  // 로딩창
  // const [fetching, setFetching] = useState(false);

  // 최초 데이터를 불러들이는 방식 useEffect()
  // useEffect(() => {
  //   setFetching(true);
  //   getOne({ pno, successFn, failFn, errorFn });
  // }, []);

  // ReactQuery 로 API 연동하기
  // V5 일때 방식
  const { data, isFetching } = useQuery({
    // 상태관리를 위해서 이름을 짓자
    // 많은 분들이 이름을 지을때 배열방식을 사용
    queryKey: ["products", pno],
    // 상태(products) 의 값이 바뀌면 실행할 함수
    queryFn: () => getOne({ pno }),
    // 백엔드 호출을 줄이자.
    // 1000 이 1초
    // queryKey 의 값이 바뀌지 않으면
    // 백엔드 다시 호출하지 않는 시간제한
    staleTime: 1000 * 60,
  });

  // useQuery() 실행하고 결과값 담기
  const product = data || initState;

  // const successFn = result => {
  //   // setFetching(false);
  //   console.log(result);
  //   // setProduct(result);
  // };
  // const failFn = result => {
  //   // setFetching(false);
  //   console.log(result);
  // };
  // const errorFn = result => {
  //   // setFetching(false);
  //   console.log(result);
  // };

  const { moveToModify, moveToList, page } = useCustomMove();

  // 사용자 정보를 이용해서 장바구니 담기
  const { loginState } = useCustomLogin();
  // 장바구니 관련 RTK state 사용
  const { cartItems, refreshCart, changeCart } = useCustomCart();

  const handleClickAddCart = () => {
    // console.log(pno);
    // console.log(typeof pno);
    // 상품은 보통 1개를 담는다.
    let qty = 1;
    // 현재 장바구니에 동일한 상품이 담겼는지 아닌지 구분
    // 1. 이미 상품이 담겨있다면 개수를 1개 증가
    let addItem = cartItems.filter(item => item.pno === parseInt(pno));
    addItem = addItem[0];
    // console.log(addItem);
    // 현재 상품이 장바구니에 있다.
    // addItem 이 비어 있는 배열이 아니라는 것
    if (addItem) {
      // 상품이 이미 있다면
      // js 를 이용하여 입력창 띄워보기
      if (window.confirm("이미 상품이 있습니다. 추가하시겠습니까?") === false) {
        return;
      }
      // 사용자 추가 구매를 시도함.
      addItem.qty += 1;
      qty = addItem.qty;
    }

    // 장바구니에 상품을 담고 RTK 의 state 를 업데이트
    changeCart({ email: loginState.email, pno: pno, qty: qty });
  };

  return (
    <div>
      {isFetching ? <Fetching /> : null}
      <div>
        <div>제품번호: {product.pno}</div>
      </div>
      <div>
        <div>제품이름: {product.pname}</div>
      </div>
      <div>
        <div>제품설명: {product.pdesc}</div>
      </div>
      <div>
        {product.uploadFileNames.map((item, index) => (
          <img key={index} src={`${host}/api/products/view/s_${item}`} />
        ))}
      </div>
      <div>
        <button onClick={() => handleClickAddCart()}>장바구니담기</button>
        <button onClick={() => moveToModify(product.pno)}>수정</button>
        <button onClick={() => moveToList({ page })}>목록가기</button>
      </div>
    </div>
  );
};

export default ProductReadComponent;
```

- axios 는 return 만 해도 된다.

```js
// 하나의 제품 정보 가져오기
export const getOne = async ({ pno }) => {
  try {
    const res = await jwtAxios.get(`${host}/${pno}`);
    const status = res.status.toString();
    return res.data;
  } catch (error) {
    console.log("상세정보 호출 서버 에러에요");
  }
};
```

- 내용 1차 정리

```txt
   V5 입니다.
   useQuery 함수에 매개변수로 {} 묶어주고 전달한다.
   : 매개변수는 객체리터럴 형태로서 {이름:값, 이름:함수.. }
   : 매개변수 객체의 이름들은 API 를 참조하여서 활용
   : 리턴값 data 는 API 연동 실행후 돌려진 값
   : 리턴값 isFetching 은 API 연결 실행중 (로딩창 등..)
   useQuery 값을 읽기
   제일 중요한 것은 queryKey 가 중요합니다.
   queryKey 가  ReactQuery 의 변수목록이 됩니다.
   queryFn  가   axios 호출

   staleTime 가  API 백엔드 서버를 호출할지 말지 시간조절
   staleTime 에 지정한 시간 안에는 다시 API 백엔드 호출 않함
       fresh 상태에서는 호출 안함

   staleTime 에 지정한 시간 지나면 API 백엔드 호출 가능
       stale 상태에서 호출 가능

   주의 사항
    : axios 코드에서는 반드시 return 이 있어야 정상 작동됩니다.

```

## 8. useQuery 활용하여 상품 목록 데이터 읽기

- src/components/product/ProductListComponent.js

```js
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
```

- 내용 요약

```txt
  강제로 ReactQuery 의 상태를 변경하는 방법이 있다.

  // App.js 에 셋팅한 client 참조
  const client = useQueryClient();
  client.invalidateQueries("키명");

  위처럼 적용하면 "키명" 에 담은 값을 초기화한다.
  그래서 상태가 바뀌므로 다시 ReactQuery 가 호출된다.

```

## 9. useMutaion을 활용하여 데이터 보내기

- mutaition 은 변화한다는 의미
- post, put, patch, delete 역할
- https://tanstack.com/query/latest/docs/framework/react/reference/useMutation
- src/components/product/ProductAddComponent.js

```js
import React, { useRef, useState } from "react";
import { postAdd } from "../../api/productApi";
import Fetching from "../common/Fetching";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 제품 입력시 초기값
const initState = {
  pname: "",
  pdesc: "",
  price: 0,
  files: [], // 제품이미지 여러장
};
const ProductAddComponent = () => {
  const [product, setProduct] = useState(initState);
  // 정보업데이트
  const handleChange = e => {
    // e.target.name; (DOM Element 참조)
    // e.target.value; (DOM Element 의 값)
    product[e.target.name] = e.target.value;
    setProduct({ ...product });
  };
  // 파일업로드 (꼭 형식을 지켜주세요. FB 달라요)
  // 반드시 FormData 를 이용하셔야 해요.
  // 반드시 Header 에 multipart/form-data 라고 보내야 합니다.
  // 파일 업로드가 아니더라도
  // **** 리액트에선 html 태그를 선택해야하는 경우
  // **** document.querySelect 를 활용하지 않습니다.
  // **** useRef 를 꼭 활용하세요. (DOM 요소를 참조한다.)

  // useRef 를 만들면 반드시 태그랑 연결한다.
  const uploadRef = useRef(null);

  // 로딩창 보여주기 상태
  // const [fetching, setFetching] = useState(false);

  // ReactQuery 로 업데이트하겠다.
  // useQuery 에서는 isFetching
  // useMutaion 에서는 isPending
  const addMutaion = useMutation({
    // API 로 자료 전송
    mutationFn: product => postAdd({ product }),
  });

  // 파일업로드 실행
  const handleClick = () => {
    // 현재 input type="file" 에 담긴 내용을 파악한다.
    // useRef 참조한 내용은 .current 에 담겨있다.
    // 담겨있는 종류가 files 즉, 복수형으로 담겨있어요.
    const files = uploadRef.current.files;
    const filesTotal = files.length;
    // console.log(images);
    // console.log(imagesTotal);
    // 아주 독특해요. 파일업로드는 달라요.
    const formData = new FormData();
    // 파일을 객체 담아주셔야합니다.
    // 파일업로드시에는 꼭 지켜주셔야 합니다.
    for (let i = 0; i < filesTotal; i++) {
      // 웹브라우저에 formData 객체에 담는다.
      console.log(files[i]);
      formData.append("files", files[i]);
    }
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);

    // console.log(product);
    // 제품 정보 전송하기
    // setFetching(true);
    // postAdd({ product: formData, successFn, failFn, errorFn });
    addMutaion.mutate(formData);
  };

  // const [resultTitle, setResultTitle] = useState("");
  // const [resultContent, setResultContent] = useState("");
  // const [reDirect, setReDirect] = useState(0);

  // const successFn = result => {
  //   // setFetching(false);
  //   setResultTitle("이미지 업로드");
  //   setResultContent("이미지 업로드에 성공하였습니다.");
  //   setReDirect(0);
  //   console.log(result);
  // };
  // const failFn = result => {
  //   // setFetching(false);
  //   setResultTitle("이미지 업로드 오류");
  //   setResultContent("오류가 발생하였습니다. 잠시 후 시도해주세요.");
  //   setReDirect(1);
  //   console.log(result);
  // };
  // const errorFn = result => {
  //   // setFetching(false);
  //   setResultTitle("서버 오류");
  //   setResultContent("오류가 발생하였습니다. 관리자에게 문의해 주세요.");
  //   setReDirect(1);
  //   console.log(result);
  // };

  // 커스텀 훅 활용하기
  const { moveToList } = useCustomMove();
  // APP client 참조
  const client = useQueryClient();
  const closeModal = () => {
    // 팝업닫기
    // setResultTitle("");
    // if (reDirect === 0) {
    //   // 목록가기
    //   moveToList({ page: 1 });
    // } else {
    //   // 팝업닫기
    // }
    client.invalidateQueries("products/list");
    moveToList({ page: 1 });
  };

  return (
    <div>
      {addMutaion.isSuccess ? (
        <ResultModal
          title={"제품 등록 결과"}
          content={`${addMutaion.data.result}가 등록되었습니다.`}
          callFn={closeModal}
        />
      ) : null}

      {addMutaion.isPending ? <Fetching /> : null}
      <div>
        <div>제품 이름</div>
        <div>
          <input
            type="text"
            name="pname"
            onChange={e => handleChange(e)}
            value={product.pname}
          />
        </div>
      </div>

      <div>
        <div>제품 설명</div>
        <div>
          <input
            type="text"
            name="pdesc"
            onChange={e => handleChange(e)}
            value={product.pdesc}
          />
        </div>
      </div>

      <div>
        <div>제품 가격</div>
        <div>
          <input
            type="number"
            name="price"
            onChange={e => handleChange(e)}
            value={product.price}
          />
        </div>
      </div>

      <div>
        <div>이미지는 여러장 업로드</div>
        <div>
          {/* ref : useRef 연결하기 */}
          {/* multiple : 파일을 여러개 업로드 */}
          <input ref={uploadRef} multiple={true} type="file" name="" />
        </div>
      </div>

      <div>
        <div>
          <button onClick={handleClick}>제품 추가</button>
        </div>
      </div>
    </div>
  );
};

export default ProductAddComponent;
```

## 10. useMutaion/useQuery 로 수정하기

- src/components/product/ProductModifyComponent.js
- 데이터 가져오기 (useQuery)
  : 데이터를 읽어들이고 상태를 변경해야 합니다.

- 삭제하기 (useMutation)
  : 삭제하기가 성공하면 어떻게 하지? 개발자가 처리
  : V5 onSuccess 가 제거됨(Deprecated).

- 수정하기 (useMuation)
  : 수저하기가 성공하면 어떻게 하지? 개발자가 처리
  : V5 onSuccess 가 제거됨(Deprecated).

```js
import React, { useEffect, useRef, useState } from "react";
import { deleteOne, getOne, putOne } from "../../api/productApi";
import Fetching from "../common/Fetching";
import { API_SERVER_HOST } from "../../api/todoApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// 서버 이미지 경로 참조를 위해서 활용
const host = API_SERVER_HOST;
//  수정내용을 위한 기본 상태정보
const initState = {
  pno: 0,
  pname: "",
  price: 0,
  pdesc: "",
  delFlag: false,
  files: [],
  uploadFileNames: [],
};

const ProductModifyComponent = ({ pno }) => {
  const [product, setProduct] = useState(initState);
  // 로딩창 보여주기
  const [fetching, setFetching] = useState(false);

  //   수정을 위해서는 초기에 정보를 호출해서 출력 > 수정
  const query = useQuery({
    queryKey: ["products", pno],
    queryFn: () => getOne({ pno }),
    // staleTime: 1000
  });

  // 현재는 setState 필요합니다. 관리를 위해서
  // 아래는 조심하자 상태가 계속 업데이트 됩니다.
  // if (query.isSuccess) {
  //   setProduct(query.data);
  // }

  // useEffect 는 [] 배열(의존성 배열)의 변수가 변하면 실행된다.
  useEffect(() => {
    if (query.isSuccess) {
      setProduct(query.data);
    }
  }, [pno, query.data, query.isSuccess]);

  // useEffect(() => {
  //   // 제품 번호에 따른 상세 정보 호출
  //   // 출력 후 수정
  //   setFetching(true);
  //   getOne({ pno, successFn, failFn, errorFn });
  // }, [pno]);

  // const successFn = result => {
  //   setFetching(false);
  //   setProduct(result);
  // };
  // const failFn = result => {
  //   setFetching(false);
  //   setPopTitle("제품 정보 출력 오류");
  //   setPopContent("제품 정보 호출이 잘못되었습니다.");
  //   // 목록으로 돌아가기
  //   setResult(1);
  // };
  // const errorFn = result => {
  //   setFetching(false);
  //   setPopTitle("제품 정보 출력 오류");
  //   setPopContent("서버가 불안정합니다. 잠시 후 실행해 주세요.");
  //   // 목록으로 돌아가기
  //   setResult(1);
  // };

  // 삭제용 mutaion
  const delMutation = useMutation({
    mutationFn: pno => deleteOne({ pno }),
  });
  // 수정용 mutation
  const modMutation = useMutation({
    mutationFn: product => putOne({ pno, product }),
  });

  // 파일 변경 관련
  // html 태그의 files 참조해야 합니다.
  // html 태그 참조
  const upladRef = useRef(null);
  const handleChangeProduct = e => {
    // e.target.name
    // e.taget.value
    product[e.target.name] = e.target.value;
    setProduct({ ...product });
  };

  // 이미지 목록 삭제 기능
  const deleteImg = imageName => {
    // 실제로 이미지를 수정완료 확인 버튼 누루기 전에
    // 진짜 삭제하면 안되요. 왜냐하면, 취소가능성
    // 화면상에서만 안보이도록 추천
    // product.uploadFileNames 배열에서 제거만한다.
    //  상태 정보의 배열에서만 제거를 한다.
    // 실제 삭제는 아닙니다.
    // 배열의 filter 를 통해 업데이트시도
    // 조건에 따라서 목록을 편닙
    const arr = product.uploadFileNames.filter(item => item !== imageName);
    product.uploadFileNames = arr;
    setProduct({ ...product });
  };
  // 실제 수정 적용
  const handleClickModify = () => {
    // 이미지 업로드 기능 체크
    const files = upladRef.current.files;
    const total = files.length;
    console.log("total : ", total);
    // 이미지 업로드시 FormData 객체
    // 키 append 해야 해요.
    const formData = new FormData();
    for (let i = 0; i < total; i++) {
      formData.append("files", files[i]);
    }
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);
    formData.append("delFlag", product.delFlag);
    // 화면에 보여지고 있는 이미지
    for (let i = 0; i < product.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", product.uploadFileNames[i]);
    }
    // 보낼 formData 완료 put 실행
    setFetching(true);
    // putOne({
    //   pno,
    //   product: formData,
    //   successFn: successPro,
    //   failFn: failPro,
    //   errorFn: errorPro,
    // });

    // mutation 으로 변경
    modMutation.mutate(formData);
  };

  // const successPro = result => {
  //   setFetching(false);
  //   setPopTitle("제품 정보 수정");
  //   setPopContent("제품 정보 수정이 성공하였습니다.");
  //   // 읽기 페이지으로 돌아가기
  //   setResult(0);
  // };
  // const failPro = result => {
  //   setFetching(false);
  //   setPopTitle("제품 정보 수정 오류");
  //   setPopContent("제품 정보 수정이 오류가 발생하였습니다.");
  //   // 수정내용 유지위해서 창 만 닫기
  //   setResult(2);
  // };
  // const errorPro = result => {
  //   setFetching(false);
  //   setPopTitle("제품 정보 수정 오류");
  //   setPopContent("서버가 불안정합니다. 다시 시도해주세요");
  //   // 수정내용 유지위해서 창 만 닫기
  //   setResult(2);
  // };

  const handleClickDelete = num => {
    // 삭제 API 연동
    setFetching(true);
    // deleteOne({
    //   pno: num,
    //   successFn: successDel,
    //   failFn: failDel,
    //   errorFn: errorDel,
    // });

    // mustation 으로 변경
    delMutation.mutate(pno);
  };
  // const successDel = result => {
  //   setFetching(false);
  //   setPopTitle("제품 정보 삭제");
  //   setPopContent("삭제에 성공하였습니다.");
  //   // 목록 가기
  //   setResult(1);
  // };
  // const failDel = result => {
  //   setFetching(false);
  //   setPopTitle("제품 정보 삭제 실패");
  //   setPopContent("삭제 호출에 실패하였습니다.");
  //   // 목록 가기
  //   setResult(2);
  // };

  // const errorDel = result => {
  //   setFetching(false);
  //   setPopTitle("제품 정보 삭제 실패");
  //   setPopContent("서버 삭제 호출에 실패하였습니다.");
  //   // 목록 가기
  //   setResult(2);
  // };

  // 팝업 관련
  const [popTitle, setPopTitle] = useState("");
  const [popContent, setPopContent] = useState("");
  const [result, setResult] = useState(0);

  //   커스텀 훅 활용
  const { moveToList, moveToRead, page, size } = useCustomMove();

  const client = useQueryClient();
  const closeModal = () => {
    client.invalidateQueries("products/list");
    client.invalidateQueries("products");
    if (delMutation.isSuccess) {
      moveToList({ page: 1 });
    }
    if (modMutation.isSuccess) {
      moveToRead(pno);
    }

    // // 팝업닫기
    // setPopTitle("");
    // if (result === 0) {
    //   // 내용 읽기로 이동
    //   moveToRead(pno);
    // } else if (result === 1) {
    //   // 목록으로 가기
    //   moveToList({ page: 1 });
    // } else if (result === 2) {
    //   // 창만 닫기
    // }
  };

  return (
    <div>
      {/* 모달창 */}
      {query.isFetching || delMutation.isPending || modMutation.isPending ? (
        <Fetching />
      ) : null}

      {/* 결과창 */}
      {delMutation.isSuccess || modMutation.isSuccess ? (
        <ResultModal
          title={"처리결과"}
          content={"정상적으로 처리가 되었습니다."}
          callFn={closeModal}
        />
      ) : null}

      <div>
        <div>제품명</div>
        <div>
          <input
            type="text"
            name="pname"
            value={product.pname}
            onChange={e => handleChangeProduct(e)}
          />
        </div>
      </div>
      <div>
        <div>제품 설명</div>
        <div>
          <input
            type="text"
            name="pdesc"
            value={product.pdesc}
            onChange={e => handleChangeProduct(e)}
          />
        </div>
      </div>
      <div>
        <div>제품 가격</div>
        <div>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={e => handleChangeProduct(e)}
          />
        </div>
      </div>

      <div>
        <div>제품 이미지</div>
        <div>
          <input type="file" multiple={true} ref={upladRef} />
        </div>
      </div>

      <div>
        <div>기존 제품 이미지</div>
        <div>
          {product.uploadFileNames.map((item, index) => (
            <div key={index}>
              <button onClick={() => deleteImg(item)}>이미지 삭제</button>
              <img key={index} src={`${host}/api/products/view/s_${item}`} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <button onClick={() => handleClickDelete(pno)}>삭제</button>
        <button onClick={handleClickModify}>수정완료</button>
        <button onClick={() => moveToList({ page, size })}>목록</button>
      </div>
    </div>
  );
};

export default ProductModifyComponent;
```
