// 추가하기
export const postData = function (datas) {
  console.log(datas);
  // 1. 보관을 할 때는 문자열로 만들어서 보관합니다.
  // 2. 로컬스토리지는 배열을 저장 못합니다.
  // 3. 로컬스토리지는 숫자를 저장 못합니다.
  // 4. 로컬스토리지는 객체를 저장 못합니다.
  // 5. 로컬스토리지는 boolean 을 저장 못합니다.
  // 6. 로컬스토리지는 []을 저장 못합니다.
  // 7. 로컬스토리지는 function을 저장 못합니다.
  // 8. 결론 그래서 문자열 형태로만 저장 됩니다.
  const saveData = JSON.stringify(datas);
  console.log(saveData);
  localStorage.setItem("todo", saveData);
};
// 읽어오기
export const getData = function () {
  // 로컬에 저장해 둔 목록을 배열에 담아줌.
  let todoArr;
  //   먼저 "todo"라고 저장해둔 Key를 이용 해서 목록을 불러온다
  const result = localStorage.getItem("todo");

  if (!result) {
    // "todo"라는 key 가 없을 경우,
    // 강제로 생성 및 초기값을 셋팅
    localStorage.setItem("todo", "[]");
    // 사용할 목록 배열이 없다고 셋팅을 했어요.
    todoArr = [];
  } else {
    // "todo" 라는 Key가 있으므로
    // 현재 저장해 둔 값을 읽어서 모록으로 변환합니다.
    // 왜 변환을 해야 하냐면...
    //  저장된 값은 문자열이라서 입니다.
    // JSON.parse 를 이용해서 JS 객체로 변환합니다.
    todoArr = JSON.parse(result);
  }

  return todoArr;
};
// 수정하기
export const putData = function () {};
// 삭제하기
export const deleteData = function () {};
