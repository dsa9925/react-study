import React, { useState } from "react";
import {
  deleteMeal,
  getMeal,
  postMeal,
  putMeal,
} from "../../api/meal/meal_api";

const Meal = () => {
  // jsx 에 변수에 출력할 변수
  // 새로고침 없이 바뀐 값 출력
  const [data, setData] = useState([]);

  // 이벤트 처리 함수
  const handleClickGet = () => {
    getMeal(1, 10, 0, setData);
  };

  // 등록 시 처리할 함수
  const postResult = num => {
    // console.log("받아온 결과값: ", num)
    // alert(`"받아온 결과값: ", ${num}`);
    if (num === 1) {
      alert("정상적으로 등록되었습니다.");
    } else if (num === -100) {
      alert("서버에러");
    } else {
      alert("입력 내용 항목 체크 필요");
    }
  };
  const handleClickPost = () => {
    const obj = {
      title: "김밥",
      ingredient: "김, 햄, 계란, 우엉, 당근",
      recipe: "잘 말아줘",
      review: "잘먹었습니다.",
      pics: [
        "https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/02/111057059.1.jpg",
        "https://newsimg.hankookilbo.com/cms/articlerelease/2021/04/29/62a1cda6-ec70-44a8-811c-fbc6300a18ed.png",
      ],
      tags: ["string"],
    };
    postMeal(obj, postResult);
  };
  const handleClickPut = () => {
    putMeal();
  };
  const handleClickDelete = () => {
    deleteMeal();
  };

  return (
    <div>
      <div>
        Meal Get 결과 :{" "}
        {data.map(item => (
          <div key={item.imeal}>
            <p>item.imeal : {item.imeal} </p>
            <p>item.imeal : {item.title}</p>
            <p>item.imeal : {item.review}</p>
            <p>item.imeal : {item.createdAt}</p>
            <p>
              item.imeal : <img src={item.pics} />
            </p>
            <p>item.imeal : {item.tags}</p>
            <hr />
          </div>
        ))}
        <br />
      </div>
      <hr />

      <div>
        Meal Post 결과 :
        <br />
      </div>
      <hr />

      <div>
        Meal Put 결과 :
        <br />
      </div>
      <hr />

      <div>
        Meal Delete 결과 :
        <br />
      </div>
      <hr />

      <div>
        <button
          onClick={() => {
            handleClickGet();
          }}
        >
          Get
        </button>
        <button
          onClick={() => {
            handleClickPost();
          }}
        >
          Post
        </button>
        <button
          onClick={() => {
            handleClickPut();
          }}
        >
          Put
        </button>
        <button
          onClick={() => {
            handleClickDelete();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Meal;
