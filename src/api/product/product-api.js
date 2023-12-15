import axios from "axios";
import { SERVER_URL } from "../config";
// 매번 swagger 의 주소가 바뀐다면 5번 고쳐야 해.
// 아! 변수 에 담아서 사용하면 하나만 고쳐되 되네!!!!
const path = `${SERVER_URL}/api/meal`;

export const getProduct = async setProductList => {
  try {
    const 응답 = await axios.get(`${path}?page=1&row_count=4&bookmark=0`);
    setProductList(응답.data);
  } catch (error) {
    console.log(error);
  }
};
export const postProduct = async (postResultAction, obj) => {
  try {
    const 응답 = await axios.post(`${path}`, obj);
    postResultAction(응답.data.result);
  } catch (error) {
    console.log(error);
    postResultAction(-5000);
  }
};
export const patchProduct = async () => {
  try {
    const 응답 = await axios.patch(`${path}`);
    console.log(응답.data);
  } catch (error) {
    console.log(error);
  }
};
export const putProduct = async putResultAction => {
  const obj = {
    imeal: 0,
    title: "string",
    ingredient: "string",
    recipe: "string",
    review: "string",
  };
  try {
    const 응답 = await axios.put(`${path}`, obj);
    putResultAction(응답.data.result);
  } catch (error) {
    putResultAction(-500);
  }
};
export const deleteProduct = async deleteResultAction => {
  try {
    const 응답 = await axios.delete(`${path}?imeal=1`);
    deleteResultAction(응답.data.result);
  } catch (error) {
    deleteResultAction(-50000);
  }
};
