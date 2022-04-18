import "./index.css";
import { FiDelete } from "react-icons/fi";

function App() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="grid grid-rows-7 grid-cols-4 align-middle gap-1 text-right">
        <span id="display" className="text-3xl font-bold py-2 px-4 col-span-4">
          0
        </span>
        <button id="clear" className="btn-calc">
          C
        </button>
        <button id="delete" className="btn-calc col-span-2 ">
          <FiDelete className="mx-5" size={35} />
        </button>
        <button id="divide" className="btn-calc">
          /
        </button>
        <button id="seven" className="btn-calc">
          7
        </button>
        <button id="eight" className="btn-calc">
          8
        </button>
        <button id="nine" className="btn-calc">
          9
        </button>
        <button id="multiply" className="btn-calc">
          x
        </button>
        <button id="four" className="btn-calc">
          4
        </button>
        <button id="five" className="btn-calc">
          5
        </button>
        <button id="six" className="btn-calc">
          6
        </button>
        <button id="subtract" className="btn-calc">
          -
        </button>
        <button id="one" className="btn-calc">
          1
        </button>
        <button id="two" className="btn-calc">
          2
        </button>
        <button id="three" className="btn-calc">
          3
        </button>
        <button id="add" className="btn-calc">
          +
        </button>
        <button id="zero" className="btn-calc col-span-2">
          0
        </button>
        <button id="decimal" className="btn-calc">
          .
        </button>
        <button id="equals" className="btn-calc">
          =
        </button>
      </div>
    </div>
  );
}

export default App;
