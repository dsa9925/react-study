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
