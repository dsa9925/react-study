import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "./api/config";
import { getCooks, getCooksId, postCooks } from "./api/cooks/cooks_api";
import {
  getPosts,
  getPostsId,
  postPosts,
  postposts,
} from "./api/posts/posts_api";
import { getTodos, getTodosId, postTodos } from "./api/todos/todos_api";

const App = () => {
  // usetState 는 화면 새로 고침(출력은 유지)
  const [cooks, setCooks] = useState([]);
  // 외부 데이터 호출을 비동기로 처리

  const getWaitCooks = async () => {
    const temp = getCooks(setCooks);
  };

  useEffect(() => {
    // 화면이 완료되면 전체 호출
    console.log("useEffect 단계");
    getWaitCooks();

    getTodos();
    getPosts();
  }, []);

  const [todayCook, setTodayCook] = useState("");
  const [addCook, setAddCook] = useState("요리를 추가해주세요.");
  const [todayTodos, setTodayTodos] = useState("");
  const [addTodo, setAddTodo] = useState("할일을 추가해주세요.");

  return (
    <div>
      <p>요리 3번 출력 : {todayCook}</p>
      <button
        onClick={() => {
          getCooksId(3, setTodayCook);
        }}
      >
        요리 3번 줘
      </button>

      <p>할일 2번 출력 : {todayTodos}</p>
      <button
        onClick={() => {
          getTodosId(2, setTodayTodos);
        }}
      >
        할일 2번 줘
      </button>

      <button
        onClick={() => {
          getPostsId(2);
        }}
      >
        포스트 2번 줘
      </button>

      <hr />

      <p>요리추가 결과 : {addCook}</p>

      <button
        onClick={() => {
          postCooks({ hit: false, category: "면", name: "김도현" }, setAddCook);
        }}
      >
        요리추가
      </button>

      <p>할일 추가 결과 : {addTodo}</p>
      <button
        onClick={() => {
          postTodos(
            {
              complete: false,
              content: "할일 추가 결과",
              date: "2023-12-12",
              mood: 12,
              title: "김도현",
            },
            setAddTodo,
          );
        }}
      >
        할일추가
      </button>

      <button
        onClick={() => {
          postPosts({
            title: "json-server 222",
            author: "typicode 222",
          });
        }}
      >
        포스트추가
      </button>

      <hr />
      <div>
        <h2>요리 전체 자료 출력(axios의 Get 활용)</h2>
        {/* <div>요리 목록 : {cooks}</div> */}
        <ul>
          {cooks.map((item, idx) => {
            return <li key={idx}>{item.id}ddd</li>;
          })}

          <li>id: 아이디, name: 이름, category: 카테고리, hit: 히트 </li>
        </ul>
      </div>
    </div>
  );
};

export default App;
