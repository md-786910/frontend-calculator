import React, { useEffect, useState } from "react";
import {
  addCalculationData,
  deleteCalculationData,
  getCalculationData,
} from "../utils/axios";
import { useNavigate } from "react-router-dom";
let expression = "";
function Calculator() {
  const navigate = useNavigate();
  const [exp, setExp] = useState("");
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [preExp, setPreExp] = useState("");
  const [preAns, setPreAns] = useState("");

  const operation = (number) => {
    const strNumber = number.toString();
    expression = expression + strNumber;
    setExp(expression);
  };

  const handleAnswer = () => {
    // set pre exp
    setPreExp(expression);
    setPreAns(eval(expression).toFixed(2).toString());

    // after operation
    setExp(eval(expression).toFixed(2));
    expression = eval(expression).toFixed(2).toString();
  };

  // clear exp
  const clearExp = () => {
    setExp("");
    expression = "";
  };
  // removeExpression exp
  const removeExpression = () => {
    expression = expression.slice(0, -1);
    setExp(expression);
  };

  // handle submit
  const handleSubmit = async () => {
    if (!name) {
      return;
    }
    // submit
    const resp = await addCalculationData(name, preExp, preAns);
    if (resp.status === 201) {
      getCalculation();
      setName("");
    }
  };
  // handle delete
  const deleteCalc = async (id) => {
    // submit
    const resp = await deleteCalculationData(id);
    if (resp.status === 201) {
      getCalculation();
    }
  };
  // handle show expression
  const handleExprssionShow = async (expressionShow) => {
    expression = expressionShow;
    setExp(expressionShow);
  };

  // fetch
  async function getCalculation() {
    const res = await getCalculationData();
    setData(res?.data?.data);
  }

  useEffect(() => {
    getCalculation();
  }, []);

  return (
    <div className="flex center w-100 mTop">
      <main className="flex min-h-screen m-auto">
        <div className="w-100 min-w-400">
          <h1>Claculator</h1>

          <div className="mTop preview">
            <span className="maths">{exp}</span>
          </div>
          <div className="grid w-100">
            <button onClick={() => clearExp()}>Ac</button>
            <button onClick={() => removeExpression()}>C</button>
            <button onClick={() => operation("%")}>%</button>
            <button className="operators" onClick={() => operation("/")}>
              /
            </button>

            <button onClick={() => operation(1)}>1</button>
            <button onClick={() => operation(2)}>2</button>
            <button onClick={() => operation(3)}>3</button>
            <button className="operators" onClick={() => operation("+")}>
              +
            </button>

            <button onClick={() => operation(4)}>4</button>
            <button onClick={() => operation(5)}>5</button>
            <button onClick={() => operation(6)}>6</button>
            <button className="operators" onClick={() => operation("-")}>
              -
            </button>

            <button onClick={() => operation(7)}>7</button>
            <button onClick={() => operation(8)}>8</button>
            <button onClick={() => operation(8)}>9</button>
            <button className="operators" onClick={() => operation("*")}>
              *
            </button>

            <button className="span-2" onClick={() => operation(0)}>
              0
            </button>
            <button onClick={() => operation(".")}>.</button>
            <button className="operators" onClick={() => handleAnswer()}>
              {" "}
              =={" "}
            </button>
          </div>
          <div className="mTopBottom">
            <h3>Calculation Name</h3>
            <div className="flex mt-5">
              <input
                type="text"
                className="w-100"
                placeholder="enter  name"
                onChange={(e) => setName(e.target.value)}
              />
              <button className="btn-primary" onClick={() => handleSubmit()}>
                Save
              </button>
            </div>
          </div>
        </div>
        <div className=" w-100">
          <h1>Your Calculations</h1>
          {data?.length > 0 ? (
            <table border="0" width={"400"} className="mTop">
              <thead>
                <tr>
                  <th>
                    <input checked type="checkbox" />
                  </th>
                  <th>Name</th>
                  <th>Calculation</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((cal) => {
                  return (
                    <>
                      <tr key={cal.name}>
                        <td>
                          <input type="checkbox" checked />
                        </td>
                        <td>{cal?.name}</td>
                        <td>{cal?.expression}</td>
                        <td>{cal?.result}</td>
                        <td>
                          <i
                            className="fa-solid fa-arrows-rotate"
                            onClick={() => handleExprssionShow(cal?.expression)}
                          ></i>
                          <i
                            className="fa-solid  fa-trash "
                            onClick={() => deleteCalc(cal?._id)}
                          ></i>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h3 className="notCal">No Calculation Found</h3>
          )}
        </div>
        <div className="w-100">
          <button
            className="btn-danger"
            onClick={() => {
              navigate("/login");

              localStorage.removeItem("access_token");

              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}

export default Calculator;
