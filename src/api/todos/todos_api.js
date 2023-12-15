import axios from "axios";
import { SERVER_URL } from "../config";

// 포스트 자료 호출
export const getTodos = async () => {
  const res = await axios.get(`${SERVER_URL}/todos`);
  console.log(res.data);
};

// 항목 한개만 가져오기
export const getTodosId = async (id, fnc) => {
  const res = await axios.get(`${SERVER_URL}/todos/${id}`);
  console.log(res.data);
  fnc(res.data.content);
  return res.data;
};

// post는 추가한다는 의미
export const postTodos = async (obj, fnc) => {
  const res = await axios.post(`${SERVER_URL}/todos`, obj);
  console.log(res.data);
  fnc("성공!");
};
