import axios from "axios";
import { SERVER_URL } from "../config";

// 내용 가져오기
export const getMeal = async (page, row_count, bookmark, fn) => {
  // axios 를 사용하는 경우에는 언제든 에러가 발생할 수 있다.
  // 반드시 try { 위험한 코드 } catch(error) 를 반드시 사용해야한다.

  try {
    const url = `${SERVER_URL}/api/meal?page=${page}&row_count=${row_count}&bookmark=${bookmark}`;
    const res = await axios.get(url);
    fn(res.data);
  } catch (error) {
    // 개발 중에만 활용
    // 실제 서비스에서는 경고창으로 마무리 하자.
    alert(`${error} 가 발생했습니다. 데모데이터 쓸게요`);

    // 더미데이터를 이용해서 작업은 진행할 수 있다.
    const demo = await axios.get("getmeal.json");
    fn.log(demo.data);
  }
};
// 내용 추가하기
export const postMeal = async (obj, postResult) => {
  try {
    const res = await axios.post(`${SERVER_URL}/api/meal`, obj);
    postResult(res.data.result);
    // 1. response 결과값에 따라서 적절한 안내창 출력
    // 2. 정상적으로 등록 안내창 띄우고, 목록창으로 이동.
  } catch (error) {
    console.log(error);
    postResult(-100);
    // 3. 서버가 문제가 있다.
  }
};

// 내용 업데이트하기
export const putMeal = async () => {
  const res = await axios.put(`${SERVER_URL}/api/meal`);
  console.log(res.data);
};

// 내용 삭제하기
export const deleteMeal = async () => {
  const res = await axios.delete(`${SERVER_URL}/api/meal`);
  console.log(res.data);
};
