import React, { useState } from "react";
import { Modal, Calendar } from "antd";
// 외부 데이터 가져오기
// - 일별데이터
//     "todos": [
//       {
//         "itodo": 1,
//         "todoUser": 1,
//          "todoTitle": "크리스마스 할일",
//         "todoContent": "todoContent",
//         "todoComplete": 1,
//         "todoDate": "2023-12-24",
//         "todoPic": "https://cdn.mediatoday.co.kr/news/photo/202311/313885_438531_4716.jpg"
//       }
//     ]

const getListData = () => {
  let listData = [
    {
      itodo: 1,
      todoUser: 1,
      todoTitle: "크리스마스 할일",
      todoContent: "todoContent",
      todoComplete: 1,
      todoDate: "2023-12-24",
      todoPic:
        "https://cdn.mediatoday.co.kr/news/photo/202311/313885_438531_4716.jpg",
    },
    {
      itodo: 2,
      todoUser: 1,
      todoTitle: "혼자 바다구경 ㅠㅠ",
      todoContent: "todoContent",
      todoComplete: 1,
      todoDate: "2023-12-24",
      todoPic:
        "https://cdn.mediatoday.co.kr/news/photo/202311/313885_438531_4716.jpg",
    },
    {
      itodo: 3,
      todoUser: 1,
      todoTitle: "혼자 바다구경 ㅠㅠ",
      todoContent: "todoContent",
      todoComplete: 1,
      todoDate: "2023-12-21",
      todoPic:
        "https://cdn.mediatoday.co.kr/news/photo/202311/313885_438531_4716.jpg",
    },
  ];

  return listData;
};

const Schedule = () => {
  // 자바스크립트 자리
  // 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCon, setModalCon] = useState({});
  const showModal = _todo => {
    setModalCon(_todo);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 일별 자료 출력하기
  const dateCellRender = value => {
    // console.log("dateCellRender 일별자료 : jsx 만듦", value);
    const listData = getListData();
    const selectDate = `${value.year()}-${value.month() + 1}-${value.date()}`;
    // 모든 목록에서 selectDate 와 같은 날짜들을 찾아요.
    // 그리고 모아요.
    // 그리고 출력해요. JSX 로
    // (trim으로 앞뒤 공백제거)
    const findeShowList = listData.filter(
      item => item.todoDate.trim() === selectDate,
    );

    console.log("데이터가 있는 날짜 ", findeShowList);

    // console.log("listData 출력할 자료", listData);
    // console.log("날짜 정보 ", selectDate);
    // console.log("날짜", value.year(), value.month() + 1, value.date());
    // 아래에서 Cell 에 출력할 자료를 만든다.
    return (
      <ul className="events">
        {/* 배열 반복 JSX 만들기 : map */}
        {findeShowList.map(item => (
          <li
            key={item.itodo}
            onClick={() => {
              showModal(item);
            }}
          >
            {/* <Badge status={item.type} text={item.content} /> */}
            <span>{item.todoTitle}</span>
            {/* 이미지가 있을지 아닐지 몰라 */}
            {/* {item.todoPic ? (
              <img src={item.todoPic} alt="" style={{ width: "100%" }} />
            ) : (
              ""
            )} */}
          </li>
        ))}
      </ul>
    );
  };

  // 각각의 셀의 날짜를 보고, 정보를 출력하는 역할
  const cellRender = (current, info) => {
    // console.log("cellRender 칸 채우기 : ", current, info);
    if (info.type === "date") {
      return dateCellRender(current);
    }
    return info.originNode;
  };

  return (
    <div>
      <h1>캘린더 연습</h1>
      <div style={{ width: "80%", margin: "0 auto" }}>
        {/* 캘린더 컴포넌트가 그려질때 밑에꺼가 실행이 됨 {}괄호한에 있는 cellRenderdms Props로 전달하는거임*/}
        <Calendar cellRender={cellRender} />
      </div>
      {/* 모달 */}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          {modalCon.todoTitle}
          <hr />
          <img src={modalCon.todoPic} alt="" style={{ width: "100%" }} />
        </div>
      </Modal>
    </div>
  );
};

export default Schedule;
