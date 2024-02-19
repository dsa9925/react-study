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
  // V5 입니다.
  // useQuery 함수에 매개변수로 {} 묶어주고 전달한다.
  // : 매개변수는 객체리터럴 형태로서 {이름:값, 이름:함수.. }
  // : 매개변수 객체의 이름들은 API 를 참조하여서 활용
  // : 리턴값 data 는 API 연동 실행후 돌려진 값
  // : 리턴값 isFetching 은 API 연결 실행중 (로딩창 등..)
  // useQuery 값을 읽기
  // 제일 중요한 것은 queryKey 가 중요합니다.
  // queryKey 가  ReactQuery 의 변수목록이 됩니다.
  // queryFn  가   axios 호출

  // staleTime 가  API 백엔드 서버를 호출할지 말지 시간조절
  // staleTime 에 지정한 시간 안에는 다시 API 백엔드 호출 않함
  //     fresh 상태에서는 호출 안함

  // staleTime 에 지정한 시간 지나면 API 백엔드 호출 가능
  //     stale 상태에서 호출 가능

  // 주의 사항
  //  : axios 코드에서는 반드시 return 이 있어야 정상 작동됩니다.

  const { data, isFetching } = useQuery({
    queryKey: ["products", pno],
    queryFn: () => getOne({ pno }),
    staleTime: 1000 * 60,
  });
  const product = data || initState;

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
