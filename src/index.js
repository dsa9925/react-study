import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import Heading from "./Heading.js";
import Heading02 from "./Heading02";
import Heading03 from "./Heading03";
import Heading04 from "./Heading04";
import Heading05 from "./Heading05";

// const Heading = function () {
//   return (
//     <div>
//       반가워요. <b>김도현</b> 컴포넌트로 HTML 만듦
//     </div>
//   );
// };

// const Heading02 = function () {
//   return <h1>반가워요.</h1>;
// };

// const Heading03 = function () {
//   return <h2>소제목입니다.</h2>;
// };

// const Heading04 = function () {
//   return <header>상단이에요.</header>;
// };

// const Heading05 = function () {
//   return (
//     <>
//       <p>1번 문장입니다.</p>
//       <p>2번 문장입니다.</p>
//     </>
//   );
// };

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Heading />
    <Heading02 />
    <Heading03 />
    <Heading04 />
    <Heading05 />
    <App />
  </React.StrictMode>
);
