import jwtAxios from "../util/jwtUtil.js";
import { API_SERVER_HOST } from "./todoApi.js";

const host = `${API_SERVER_HOST}/api/cart`;

export const getCartItems = async () => {
  // 파라메터는 JWT 인증으로 해결할 것이다.
  const res = await jwtAxios.get(`${host}/items`);
  return res.data;
};

// 포스트 기능
// 제품 수량등 변경
export const postChangeCart = async cartItem => {
  // 실제로 개발에 필요한 것과 예제로 그냥 진행하는 것과는 차이가 있다.
  const res = await jwtAxios.post(`${host}/change`, cartItem);
  return res.data;
};
