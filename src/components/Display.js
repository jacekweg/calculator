import React from "react";

function Display({ value }) {
  return (
    <div id="display" className="calc-display">
      {value}
    </div>
  );
}

export default Display;
