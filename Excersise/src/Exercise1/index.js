import React, { useState } from "react";
import "./style.css";

const Exercise0_1 = () => {
  const [counter, setCounter] = useState(0);

  const increaseCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="react3">
      <div className="result">{counter}</div>
      <Button onClick={increaseCounter} size="lg">
        Click
      </Button>
    </div>
  );
};

export default Exercise0_1;