import React from "react";

const App = () => {
  // 입력값 제어 함수
  const handleChangeJoinForm = event => {
    // console.log(event.target);
    // console.log(event.type);
    console.log(event.target.name);
    console.log(event.target.value);
    // console.log(event.target.type);
    // console.log(event.target.id);
  };

  // 데이터 전송 처리 함수
  const handleSubmitJoinForm = event => {
    // 기본 동작 막기
    event.preventDefault();

    console.log(event);
    console.log(event.type);
    console.log(event.target);
    console.log(event.target.name);
    console.log(event.target.action);
    console.log(event.target.method);
    console.log(event.target.onSubmitd);
  };

  return (
    <div>
      <form
        action="/path"
        method="get"
        name="join"
        onSubmit={event => handleSubmitJoinForm(event)}
      >
        <fieldset>
          <legend>회원가입</legend>
          <label htmlFor="user">아이디</label>
          <input
            type="text"
            name="user"
            id="user"
            placeholder="아이디 입력해주세요."
            onChange={event => {
              handleChangeJoinForm(event);
            }}
          />
          <input type="button" name="idcheck" value="중복확인" />
          <br />
          <label htmlFor="pw">비밀번호</label>
          <input
            type="password"
            name="pw"
            id="pw"
            onChange={event => {
              handleChangeJoinForm(event);
            }}
          />
          <br />
        </fieldset>

        <fieldset>
          <legend>정보입력</legend>
          <label htmlFor="age">나이</label>
          <input
            type="number"
            name="age"
            id="age"
            onChange={event => {
              handleChangeJoinForm(event);
            }}
          />
          <br />
          <label htmlFor="gm">남성</label>
          <input
            type="radio"
            name="gender"
            value="m"
            id="gm"
            checked={true}
            onClick={event => {
              handleChangeJoinForm(event);
            }}
          />
          <label htmlFor="gf">여성</label>
          <input
            type="radio"
            name="gender"
            value="f"
            id="gf"
            onClick={event => {
              handleChangeJoinForm(event);
            }}
          />

          <br />
          <label htmlFor="js">JS</label>
          <input
            type="checkbox"
            name="js"
            id="js"
            onClick={event => {
              handleChangeJoinForm(event);
            }}
          />
          <label htmlFor="css">CSS</label>
          <input
            type="checkbox"
            name="css"
            id="css"
            onClick={event => {
              handleChangeJoinForm(event);
            }}
          />
          <label htmlFor="html">HTML</label>
          <input
            type="checkbox"
            name="html"
            id="html"
            onClick={event => {
              handleChangeJoinForm(event);
            }}
          />
          <br />
          <label htmlFor="level">성적등급</label>
          <select
            name="level"
            id="level"
            onChange={event => {
              handleChangeJoinForm(event);
            }}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          <br />
          <label htmlFor="file">파일첨부</label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={event => {
              handleChangeJoinForm(event);
            }}
          />
          <br />
          <label htmlFor="etc">기타사항</label>
          <textarea
            name="etc"
            id="etc"
            onChange={event => {
              handleChangeJoinForm(event);
            }}
          ></textarea>
        </fieldset>

        <fieldset>
          <legend>버튼들</legend>
          <input type="reset" value="다시작성" />
          <input type="submit" value="작성완료" />

          {/* form 태그 안에 작성시 */}
          <button type="submit"> type 이 없는 경우 버튼 작성 완료</button>
          <button type="button"> type 이 있는 경우 버튼 작성 완료</button>

          <input type="image" src="images/a.jpg" />
        </fieldset>
      </form>
    </div>
  );
};

export default App;
