import React, { useState } from "react";
import {
  deleteProduct,
  getProduct,
  postProduct,
  putProduct,
} from "../../api/product/product-api";

const Product = () => {
  const [productList, setProductList] = useState([]);
  const handleClickGetProduct = () => {
    getProduct(setProductList);
  };
  const postResultAction = result => {
    // 1. 안내창
    // 2. 목록가기
  };
  const handleClickPostProduct = () => {
    const obj = {
      title: "string",
      ingredient: "string",
      recipe: "string",
      review: "string",
      pics: ["string"],
      tags: ["string"],
    };
    postProduct(postResultAction, obj);
  };
  const putResultAction = result => {
    // 1. 안내창
    // 2. 목록가기
  };
  const handleClickPutProduct = () => {
    putProduct(putResultAction);
  };
  const deleteResultAction = result => {
    // 1. 안내창
    // 2. 목록가기
  };
  const handleClickDeleteProduct = () => {
    deleteProduct(deleteResultAction);
  };
  return (
    <div>
      <button onClick={handleClickGetProduct}>목록</button>
      <button onClick={handleClickPostProduct}>추가</button>
      <button onClick={handleClickPutProduct}>수정(전체)</button>
      <button onClick={handleClickDeleteProduct}>삭제</button>
    </div>
  );
};

export default Product;
