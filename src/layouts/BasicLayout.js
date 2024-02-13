import React from "react";
import BasicMenu from "../components/menus/BasicMenu";
import CartComponent from "../components/cart/CartComponent";

// 객체 구조 분해 할당
const BasicLayout = ({ children }) => {
  return (
    <div className="wrap">
      <header>
        <BasicMenu />
      </header>

      <div>
        <main>{children}</main>
        <CartComponent />
      </div>

      <footer>하단</footer>
    </div>
  );
};

export default BasicLayout;
