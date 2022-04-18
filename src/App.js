import "./index.css";
import { FiDelete } from "react-icons/fi";
import React from "react";
import Display from "./components/Display";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: false,
      currVal: 0,
    };
    this.handleDigit = this.handleDigit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleDigit(e) {
    const digit = e.target.value;
    const currentValue =
      this.state.currVal === 0 ? digit : this.state.currVal + digit;
    this.setState({ currVal: currentValue });

    //for tests to work
    let curr = document.getElementById("display").innerText;
    if (curr !== "0") {
      document.getElementById("display").innerText = curr + digit;
    } else {
      document.getElementById("display").innerText = digit;
    }
    //for tests to work
  }

  handleClear() {
    this.setState({ currVal: 0 });

    //for tests to work
    document.getElementById("display").innerText = "0";
    //for tests to work
  }

  render() {
    const { currVal } = this.state;
    return (
      <div className="calc-wrapper">
        <div className="grid grid-rows-7 grid-cols-4 align-middle gap-1 text-right">
          <Display currVal={currVal} />

          <button
            id="clear"
            className="btn-clear-calc"
            onClick={this.handleClear}
          >
            C
          </button>
          <button id="delete" className="btn-calc col-span-2">
            <FiDelete className="mx-auto" size={35} />
          </button>
          <button id="divide" className="btn-calc" value="/">
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
          <button id="multiply" className="btn-calc" value="x">
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
          <button id="subtract" className="btn-calc" value="-">
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
          <button id="add" className="btn-calc" value="+">
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
          <button id="decimal" className="btn-calc" value=".">
            .
          </button>
          <button id="equals" className="btn-calc" value="=">
            =
          </button>
        </div>
      </div>
    );
  }
}

export default App;
