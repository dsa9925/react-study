import React from "react";
import ReactDOM from "react-dom/client";
// normalize.css 파일 배치
import "./styles/normalize.css";
// index.css 파일 배치
import "./styles/index.css";
import Schedule from "./pages/schedule/Schedule";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Schedule />);
