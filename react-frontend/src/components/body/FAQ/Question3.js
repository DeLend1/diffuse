import { useState } from "react";

function Question3() {
  const [text, setText] = useState(false);

  function showText() {
    setText(!text);
  }
  return (
    <>
      {!text ? (
        <div className="faq">
          <button className="q-Button" onClick={showText}>
            Is it safe?
          </button>
        </div>
      ) : (
        <div className="faq">
          <button className="q-Button" onClick={showText}>
            Is it safe?
          </button>
          <p className="text">
            As Diffuse provides only highly efficient aggregation service, it`s
            absolutely save to use Diffuse as the app doesnt store any assets.
            Risks are only related to DeFi protocols which are being aggregated
            by Diffuse.
          </p>
        </div>
      )}
    </>
  );
}

export default Question3;
