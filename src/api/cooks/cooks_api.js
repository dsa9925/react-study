import axios from "axios";
import { SERVER_URL } from "../config";

// 요리 자료 호출
// async : 비동기로써 함수를 잠시 멈춤, 일시정지 상태
export const getCooks = async fnc => {
  // await 은 리턴을 기다린다.
  // 실제 대기를 해야 하는 함수는 getCooks 이다.
  const res = await axios.get(`${SERVER_URL}/cooks`);
  fnc([...res.data]);
};

// 항목 한개만 가져오기
export const getCooksId = async (id, fnc) => {
  const res = await axios.get(`${SERVER_URL}/cooks/${id}`);
  console.log(res.data);

  fnc(res.data.name);

  return res.data;
};

// post는 추가한다는 의미
export const postCooks = async (obj, fnc) => {
  const res = await axios.post(`${SERVER_URL}/cooks`, obj);
  console.log(res.data);
  fnc("성공적으로 추가되었어요!");
};
