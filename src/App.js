import React from "react";

const App = () => {
  const feelData = [
    { icon: "1.svg", txt: "rad", color: "green" },
    { icon: "2.svg", txt: "good", color: "red" },
    { icon: "3.svg", txt: "meh", color: "blue" },
    { icon: "1.svg", txt: "bad", color: "hotpink" },
    { icon: "2.svg", txt: "awful", color: "gold" },
  ];

  const FeelCate = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  };
  const FeelIcon = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    "text-transform": "uppercase",
  };
  return (
    <div>
      <h1>How Are You?</h1>
      <div>Calendar Print</div>
      <div>
        <ul style={FeelCate}>
          {feelData.map(function (item, index) {
            console.log(item);
            return (
              <li key={index} style={FeelIcon}>
                <img src={`images/${item.icon}`} />
                <span style={{ color: item.color }}>{item.txt}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
