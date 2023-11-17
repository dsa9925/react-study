import styles from "../styles/Header.module.css";
const Header = ({ children }) => {
  // 내부 html을 전달 받아서 내용을 변경한다.
  //   const children = props.children;
  return (
    <header className={styles.wrapnp}>
      <div>{children}</div>
    </header>
  );
};
export default Header;
