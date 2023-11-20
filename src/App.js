const App = () => {
  const flag = false;
  const person = {
    name: "홍길동",
    age: 16,
  };
  return (
    <div>
      <p>이름 : {person?.name || "이름이 없군요."} </p>
      <p>나이 : {person?.age || "나이가 없군요."} </p>
      <p>직업 : {person?.job || "직업이 없군요."}</p>
    </div>
  );
};

export default App;
