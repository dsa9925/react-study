import Header from "../components/Header";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <div>
      {/* 상단 내용 고정 */}
      <Header></Header>
      {/* 내용은 자주 변함 */}
      <main>
        <section>
          <div>이미지슬라이드</div>
        </section>
        <section>
          <div>
            <div>
              <div>공지사항</div>
              <div>갤러리</div>
            </div>
            <div>배너</div>
            <div>바로가기</div>
          </div>
        </section>
      </main>
      {/* 하단 고정 */}
      <Footer></Footer>
    </div>
  );
};
export default Main;
