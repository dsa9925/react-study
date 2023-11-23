import React, { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Member from "./pages/Member";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MembersDetail from "./pages/MembersDetail";
import Ceo from "./pages/Ceo";
import Map from "./pages/Map";
import NotFound from "./pages/NotFound";

const App = () => {
  const initMemberData = [
    { name: "송보경", level: 10, img: "a.jpg", part: "프로젝트 구성" },
    {
      name: "김도현",
      level: 5,
      img: "b.jpg",
      part: "프로젝트 참여 및 파이팅 담당",
    },
    {
      name: "김주영",
      level: 5,
      img: "c.png",
      part: "프로젝트 참여 및 간식 담당",
    },
    {
      name: "정화섭",
      level: 0,
      img: "d.gif",
      part: "프로젝트 구경 및 잔소리 담당",
    },
  ];
  const [member, setMember] = useState(initMemberData);

  return (
    <BrowserRouter>
      <div>
        {/* 항상 보여줄 컴포넌트는 Routes 에서 배제 */}
        <Header />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>

          {/* Nested 라우터 */}
          <Route path="/about" element={<About title="우리서비스소개" />}>
            {/* Outelet 컴포넌트 초기화면은 index 로 셋팅 */}
            <Route index element={<Ceo />}></Route>

            <Route path="ceo" element={<Ceo />}></Route>
            <Route path="map" element={<Map />}></Route>
          </Route>

          {/* Nested 활용하기 */}
          <Route path="/member" element={<Member member={member} />}>
            {/* Outlet 역할 */}
            <Route
              path=":id"
              element={<MembersDetail member={member} />}
            ></Route>
          </Route>

          {/* path 가 처리 안된 경우 */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
