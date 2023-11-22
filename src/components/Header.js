import React from "react";

const Header = ({ children, version }) => {
  return (
    <header>
      {children} ({version})
    </header>
  );
};

export default Header;
