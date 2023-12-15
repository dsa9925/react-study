import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// normalize.css 파일 배치
import "./styles/normalize.css";
// index.css 파일 배치
import "./styles/index.css";
import Meal from "./pages/meal/Meal";
import Product from "./pages/product/Product";

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
root.render(<Product />);
