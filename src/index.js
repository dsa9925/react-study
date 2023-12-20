import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// normalize.css 파일 배치
import "./styles/normalize.css";
// index.css 파일 배치
import "./styles/index.css";
import FileIndex from "./pages/file/FileIndex";
import Board from "./pages/board/Board";

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
// root.render(<Meal />);
// root.render(<FileIndex />);
root.render(<Board />);
