import { useState } from "react";
import Screen from "./Screen";
import Buttons from "./Buttons";

const Calculator = () => {
  const [expression, setExpression] = useState("");

  return (
    <div className="py-lg-4  py-4 w-full vh-100 d-flex justify-content-center align-items-center">
      <div className="containers p-4 m-4 h-100 d-flex justify-content-center align-items-center bg-gray">
        <div className="h-100 m-4 calculator rounded-3 box">
          <div className="p-3 screen-height">
            <Screen expression={expression} />
          </div>
          <div className="px-2 btn-height">
            <Buttons expression={expression} setExp={setExpression} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
