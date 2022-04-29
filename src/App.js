import "./index.css";
import { FiDelete } from "react-icons/fi";
import React from "react";
import Display from "./components/Display";
import { evaluate, format } from "mathjs";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
    };

    this.handleDigit = this.handleDigit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.calculate = this.calculate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDigit(e) {
    const digit = e.target.value;
    const { display: curr } = this.state;

    if (curr.length + 1 > 10) return;

    if ((curr !== "0" || /\D/.test(curr)) && curr !== "Error") {
      this.setState({
        display: curr + digit,
      });
    } else {
      this.setState({
        display: digit,
      });
    }
  }

  handleDelete() {
    const { display: curr } = this.state;
    this.setState({
      display: curr.length > 1 ? curr.slice(0, curr.length - 1) : "0",
    });
  }

  handleOperator(e) {
    let operator = e.target.value;
    const { display: curr } = this.state;
    const lastChar = curr.slice(curr.length - 1);
    let arr = curr.split(/[x/+-]/);
    let empties = arr.length - arr.filter(String).length;

    const numOfOperators =
      curr.split(/[x/+-]/).filter((a) => a).length + empties;

    if (curr.length + 2 > 10) return;

    if (lastChar === "." && operator === "-") {
      this.setState({
        display: curr.slice(0, curr.length - 1) + operator,
      });
      return;
    }

    if (operator === ".") {
      const canAddDecimal = (curr + operator + "0")
        .split(/[/x+-]/)
        .every((ele) => /^(?!-0(\.0+)?$)-?(0|[1-9]\d*)(\.\d+)?$|^$/.test(ele));

      if (!canAddDecimal) {
        return;
      }
    }

    if (operator === "-" && lastChar !== "-") {
      this.setState({
        display: curr + operator,
      });
    }

    if (/\D/.test(lastChar) && lastChar === "-" && operator !== "-") {
      const newCurr =
        curr.slice(0, curr.length - numOfOperators + 1) + operator;

      if (newCurr.length === 1) {
        this.setState({
          display: "0",
        });
        return;
      }

      this.setState({
        display: newCurr,
      });
      return;
    }

    if (/\D/.test(lastChar) && lastChar === "-" && operator === "-") {
      return;
    }

    if (/\D/.test(lastChar) && lastChar !== "-" && operator !== "-") {
      this.setState({
        display: curr.slice(0, curr.length - 1) + operator,
      });
    } else {
      document.getElementById("display").innerText = curr + operator;
      this.setState({
        display: curr + operator,
      });
    }
  }

  handleResult() {
    const { display: equation } = this.state;

    this.setState({
      display: this.calculate(equation),
    });
  }

  calculate(str) {
    let answer = "";
    str = str.replaceAll("x", "*");
    if (/^[\d()/*.+-]+$/.test(str)) {
      try {
        answer = evaluate(str);
        answer = format(answer, { precision: 6, lowerExp: -12, upperExp: 12 });
        if (
          isNaN(Number(answer)) ||
          answer === "Infinity" ||
          answer.length > 10
        )
          answer = "Error";
      } catch (er) {
        answer = "Error";
        console.log(er.name + ", " + er.message);
      }
    }
    return String(answer);
  }

  handleClear() {
    this.setState({ display: "0" });
  }

  render() {
    const { display } = this.state;
    return (
      <div className="calc-wrapper">
        <div className="grid grid-rows-7 grid-cols-4 align-middle gap-1 text-right">
          <Display value={display} />

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
