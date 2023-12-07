import { useEffect, useState } from "react";

const Buttons = ({ expression, setExp }) => {
  const [result, setResult] = useState(0);

  useEffect(() => {
    setExp(result);
  }, [result]);

  useEffect(() => {
    clearExp();
  }, []);

  //handle expression to calculate
  const handleExpression = (val) => {
    const length = expression.length;
    const lastVal = expression[length - 1];
    const operators = ["+", "-", "*", "/", "%"];
    if (operators.includes(val)) {
      if (operators.includes(lastVal) || expression.length === 0) {
        setExp(expression);
      } else {
        setExp((prev) => prev + val);
      }
    } else {
      setExp((prev) => prev + val);
    }
  };

  //clear expression
  const clearExp = () => {
    setResult(0);
    setExp("");
  };

  //console the expresion
  function consoleLog() {
    console.log(expression);
  }

  //negative the last value on pressing +- sign
  const negativeVal = () => {
    const lastOperator = expression.match(/[+\-*%/(](?=[^\-+/*]*$)/g);
    let exp = "";
    if (lastOperator !== null && expression.length !== 0) {
      const indexOfLastOperator = expression.lastIndexOf(
        lastOperator[lastOperator.length - 1]
      );

      let firstHalfExp = expression.slice(0, indexOfLastOperator + 1);
      let secondHalfExp = "-" + expression.slice(indexOfLastOperator + 1);
      exp = firstHalfExp + secondHalfExp;
      setExp(exp);
    } else if (lastOperator === null && expression.length !== 0) {
      exp = "-" + expression;
      setExp(exp);
    }
  };

  //calculate final result
  const calculateResult = () => {
    let operator = "+";
    let operand = "";
    const operators = ["+", "-", "*", "/"];
    const tokens = expression.match(/(\d+\.\d+|\d+|[+\-*/%])/g);
    setResult(0);
    const consecutiveOperators = /([+\-*/%]){3}/g;
    const tokenLen = tokens.length;
    if (
      consecutiveOperators.test(expression) ||
      operators.includes(tokens[tokenLen - 1])
    ) {
      setExp("unexpected expression");
    } else if (tokenLen === 2 && tokens[1] === "%") {
      percent(result, tokens[0]);
      setExp(result);
    } else if (tokenLen === 1) {
      setExp(tokens[0]);
    } else if (tokenLen === 2 && tokens[0] === "-") {
      setExp(expression);
    } else {
      for (let i = 0; i <= tokenLen - 1; ) {
        if (operators.includes(tokens[i]) || tokens[i] === "%") {
          operator = tokens[i];
          if (operators.includes(tokens[i + 1]) || tokens[i + 1] === "%") {
            operand = `${tokens[i + 1]}${tokens[i + 2]}`;
            i += 3;
          } else {
            operand = tokens[i + 1];
            i += 2;
          }
        } else {
          operand = tokens[i];
          i++;
        }

        switch (operator) {
          case "+": {
            add(operand);
            break;
          }
          case "-": {
            minus(operand);
            break;
          }
          case "*": {
            multiply(operand);
            break;
          }
          case "/": {
            divide(operand);
            break;
          }
          case "%": {
            percent(result, operand);
            break;
          }
          default: {
            add(operand);
            break;
          }
        }
      }
    }
  };

  //mathematical functions
  const add = (b) => {
    setResult((prevResult) => prevResult + Number(b));
  };

  const minus = (b) => {
    setResult((prevResult) => prevResult - Number(b));
  };

  const multiply = (b) => {
    setResult((prevResult) => prevResult * Number(b));
  };

  const divide = (b) => {
    setResult((prevResult) => prevResult / Number(b));
  };

  const percent = (a, b) => {
    if (b === "" || b === undefined || b === "0" || a === 0 || a === null) {
      if (b === "" || b === undefined || b === "0") {
        setResult((prevResult) => prevResult / 100);
      } else {
        setResult((prevResult) => prevResult + Number(b) / 100);
      }
    } else {
      setResult((prevResult) => (prevResult / 100) * Number(b));
    }
  };

  return (
    <div className="py-2 h-100 container">
      <div className="d-flex flex-column fs-3 gap-3 p-2 h-100 w-100">
        <div className="col d-flex gap-2 justify-content-between">
          <div className="btns rounded-circle cancel" onClick={clearExp}>
            C
          </div>
          <div className="btns" onClick={negativeVal}>
            &#177;
          </div>
          <div className="btns" onClick={() => handleExpression("%")}>
            %
          </div>
          <div className="btns fs-6 p-2 cancel" onClick={consoleLog}>
            console log
          </div>
        </div>
        <div className="col d-flex gap-2 justify-content-between">
          <div
            className="btns"
            onClick={() => {
              handleExpression("7");
            }}
          >
            7
          </div>
          <div
            className="btns"
            onClick={() => {
              handleExpression("8");
            }}
          >
            8
          </div>
          <div
            className="btns"
            onClick={() => {
              handleExpression("9");
            }}
          >
            9
          </div>
          <div
            className="btns operator"
            onClick={() => {
              handleExpression("/");
            }}
          >
            &#247;
          </div>
        </div>
        <div className="col gap-2 d-flex justify-content-between">
          <div
            className="btns"
            onClick={() => {
              handleExpression("4");
            }}
          >
            4
          </div>
          <div
            className="btns"
            onClick={() => {
              handleExpression("5");
            }}
          >
            5
          </div>
          <div
            className="btns"
            onClick={() => {
              handleExpression("6");
            }}
          >
            6
          </div>
          <div
            className="btns operator"
            onClick={() => {
              handleExpression("*");
            }}
          >
            x
          </div>
        </div>
        <div className="col d-flex gap-2 justify-content-between">
          <div
            className="btns"
            onClick={() => {
              handleExpression("1");
            }}
          >
            1
          </div>
          <div
            className="btns"
            onClick={() => {
              handleExpression("2");
            }}
          >
            2
          </div>
          <div
            className="btns"
            onClick={() => {
              handleExpression("3");
            }}
          >
            3
          </div>
          <div
            className="btns operator"
            onClick={() => {
              handleExpression("-");
            }}
          >
            -
          </div>
        </div>
        <div className="col d-flex gap-2 justify-content-between">
          <div
            className="btns"
            onClick={() => {
              handleExpression("0");
            }}
          >
            0
          </div>
          <div
            className="btns"
            onClick={() => {
              handleExpression(".");
            }}
          >
            .
          </div>
          <div
            className="btns"
            style={{ backgroundColor: "rgb(25, 82, 104)" }}
            onClick={calculateResult}
          >
            =
          </div>
          <div
            className="btns operator"
            onClick={() => {
              handleExpression("+");
            }}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buttons;
