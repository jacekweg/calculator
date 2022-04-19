import "./index.css";
import { FiDelete } from "react-icons/fi";
import React from "react";
import Display from "./components/Display";
import { evaluate, format } from "mathjs";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: false,
      currVal: 0,
    };
    this.handleDigit = this.handleDigit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.reevaluate = this.reevaluate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDigit(e) {
    const digit = e.target.value;
    const currentValue =
      this.state.currVal === 0 ? digit : this.state.currVal + digit;
    this.setState({ currVal: Number(currentValue) });

    //for tests to work
    let curr = document.getElementById("display").innerText;
    if ((curr !== "0" || /\D/.test(curr)) && curr !== "Error") {
      document.getElementById("display").innerText = curr + digit;
    } else {
      document.getElementById("display").innerText = digit;
    }
    //for tests to work
  }

  handleDelete() {
    let currentState = document.getElementById("display").innerText;
    document.getElementById("display").innerText = currentState.slice(
      0,
      currentState.length - 1
    );
  }

  handleOperator(e) {
    let operator = e.target.value;
    let currentState = document.getElementById("display").innerText;
    const lastChar = currentState.slice(currentState.length - 1);
    let arr = currentState.split(/[x/+-]/);
    let empties = arr.length - arr.filter(String).length;

    const numberOfOperators =
      currentState.split(/[x/+-]/).filter((a) => a).length + empties;

    if (operator === ".") {
      const canAddDecimal = (currentState + operator + "0")
        .split(/[/x+-]/)
        .every((ele) => /^(?!-0(\.0+)?$)-?(0|[1-9]\d*)(\.\d+)?$|^$/.test(ele));

      if (!canAddDecimal) {
        return;
      }
    }

    if (operator === "-" && lastChar !== "-") {
      document.getElementById("display").innerText = currentState + operator;
    }

    // console.log("operators: " + numberOfOperators);

    if (/\D/.test(lastChar) && lastChar === "-" && operator !== "-") {
      currentState =
        currentState.slice(0, currentState.length - numberOfOperators + 1) +
        operator;

      if (currentState.length === 1) {
        document.getElementById("display").innerText = "0";
        return;
      }

      document.getElementById("display").innerText = currentState;
      return;
    }

    if (/\D/.test(lastChar) && lastChar === "-" && operator === "-") {
      return;
    }

    if (/\D/.test(lastChar) && lastChar !== "-" && operator !== "-") {
      document.getElementById("display").innerText =
        currentState.slice(0, currentState.length - 1) + operator;
    } else {
      document.getElementById("display").innerText = currentState + operator;
    }
  }

  handleResult() {
    let equation = document.getElementById("display").innerText;
    document.getElementById("display").innerText = this.reevaluate(equation);
  }

  reevaluate(str) {
    let answer = "";
    str = str.replaceAll("x", "*");
    if (/^[\d()/*.+-]+$/.test(str)) {
      try {
        answer = evaluate(str);
        answer = format(answer, { precision: 8 });
      } catch (er) {
        answer = "Error";
        console.log(er.name + ", " + er.message);
      }
    }
    return answer;
  }

  handleClear() {
    this.setState({ currVal: 0 });

    //for tests to work
    document.getElementById("display").innerText = "0";
    //for tests to work
  }

  render() {
    return (
      <div className="calc-wrapper">
        <div className="grid grid-rows-7 grid-cols-4 align-middle gap-1 text-right">
          <Display />

          <button
            id="clear"
            className="btn-clear-calc"
            onClick={this.handleClear}
          >
            C
          </button>
          <button
            id="delete"
            className="btn-calc col-span-2"
            onClick={this.handleDelete}
          >
            <FiDelete className="mx-auto" size={35} />
          </button>
          <button
            id="divide"
            className="btn-calc"
            onClick={this.handleOperator}
            value="/"
          >
            /
          </button>
          <button
            id="seven"
            className="btn-calc"
            onClick={this.handleDigit}
            value="7"
          >
            7
          </button>
          <button
            id="eight"
            className="btn-calc"
            onClick={this.handleDigit}
            value="8"
          >
            8
          </button>
          <button
            id="nine"
            className="btn-calc"
            onClick={this.handleDigit}
            value="9"
          >
            9
          </button>
          <button
            id="multiply"
            className="btn-calc"
            onClick={this.handleOperator}
            value="x"
          >
            x
          </button>
          <button
            id="four"
            className="btn-calc"
            onClick={this.handleDigit}
            value="4"
          >
            4
          </button>
          <button
            id="five"
            className="btn-calc"
            onClick={this.handleDigit}
            value="5"
          >
            5
          </button>
          <button
            id="six"
            className="btn-calc"
            onClick={this.handleDigit}
            value="6"
          >
            6
          </button>
          <button
            id="subtract"
            className="btn-calc"
            onClick={this.handleOperator}
            value="-"
          >
            -
          </button>
          <button
            id="one"
            className="btn-calc"
            onClick={this.handleDigit}
            value="1"
          >
            1
          </button>
          <button
            id="two"
            className="btn-calc"
            onClick={this.handleDigit}
            value="2"
          >
            2
          </button>
          <button
            id="three"
            className="btn-calc"
            onClick={this.handleDigit}
            value="3"
          >
            3
          </button>
          <button
            id="add"
            className="btn-calc"
            onClick={this.handleOperator}
            value="+"
          >
            +
          </button>
          <button
            id="zero"
            className="btn-calc col-span-2"
            onClick={this.handleDigit}
            value="0"
          >
            0
          </button>
          <button
            id="decimal"
            className="btn-calc"
            onClick={this.handleOperator}
            value="."
          >
            .
          </button>
          <button
            id="equals"
            className="btn-delete-calc"
            onClick={this.handleResult}
            value="="
          >
            =
          </button>
        </div>
      </div>
    );
  }
}

export default App;
