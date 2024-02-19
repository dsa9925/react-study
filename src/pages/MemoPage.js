import React, { useCallback, useMemo, useState } from "react";
import Child from "./Child";

const MemoPage = () => {
  console.log("Rerendering 되었어요.");
  const [countState, setCountState] = useState(0);
  const onClickState = useCallback(() => {
    setCountState(prev => prev + 1);
    console.log("======>State 변수 countState", countState);
  }, []);
  return (
    <div>
      <div>Memoizatio Test</div>
      <div>
        <p>State 변수 countState : {countState}</p>
        <button onClick={onClickState}>State 변수 1 증가</button>
      </div>
      <div>
        <Child countState={countState} />
        <Child countState={countState} />
        <Child countState={countState} />
        <Child countState={countState} />
        <Child countState={countState} />
        <Child countState={countState} />
      </div>
    </div>
  );
};

export default MemoPage;
