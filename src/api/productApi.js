import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";
import jwtAxios from "../util/jwtUtil";

// 제품 API
const host = `${API_SERVER_HOST}/api/products`;

// 파일 업로드 비동기 통신
export const postAdd = async ({ product }) => {
  try {
    // 파일 업로드시 준비할 것이 있습니다.
    // 반드시 복수형으로 { headers } 작성 필요
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await jwtAxios.post(`${host}/`, product, header);
    return res.data;
  } catch (error) {
    console.log("서버에러에요");
  }
};

// 제품 목록가져오기
export const getList = async ({ param }) => {
  try {
    const res = await jwtAxios.get(`${host}/list`, { params: param });
    return res.data;
  } catch (error) {
    console.log("목록 호출 서버 에러에요");
  }
};

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

// 제품 수정하기
export const putOne = async ({ pno, product }) => {
  try {
    // 여기서도 이미지가 추가될 수 있어요.
    // header 가 필요합니다.
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await jwtAxios.put(`${host}/${pno}`, product, header);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// 상품 삭제
export const deleteOne = async ({ pno }) => {
  try {
    // 여기서도 이미지가 추가될 수 있어요.
    // header 가 필요합니다.
    const res = await jwtAxios.delete(`${host}/${pno}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
