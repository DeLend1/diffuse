import { useState } from "react";

function Question1() {
  const [text, setText] = useState(false);

  function showText() {
    setText(!text);
  }
  return (
    <>
      {!text ? (
        <div className="div1">
          <button className="q-Button" onClick={showText}>
            How does Diffuse work?
          </button>
        </div>
      ) : (
        <div className="div1">
          <button className="q-Button" onClick={showText}>
            How does Diffuse work?
          </button>
          <h1 className="text">
            Diffuse helps to deposit preffered assets to lending protocols with
            the best rate(APY) in several clicks
          </h1>
        </div>
      )}
    </>
  );
}

export default Question1;
