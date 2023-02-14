import { useState } from "react";

function Question3() {
  const [text, setText] = useState(false);

  function showText() {
    setText(!text);
  }
  return (
    <>
      {!text ? (
        <div className="div1">
          <button className="q-Button" onClick={showText}>
            Is it safe?
          </button>
        </div>
      ) : (
        <div className="div1">
          <button className="q-Button" onClick={showText}>
            Is it safe?
          </button>
          <h1 className="text">
            As Diffuse provides only highly efficient aggregation service, it`s
            absolutely save to use Diffuse as the app doesnt store any assets.
            Risks are only related to DeFi protocols which are being aggregated
            by Diffuse.
          </h1>
        </div>
      )}
    </>
  );
}

export default Question3;
